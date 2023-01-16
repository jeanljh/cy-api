/// <reference types='cypress'/>

import { key, token } from '../fixtures/auth.json'
import { id, postbody } from '../fixtures/list.json'

describe('Trello API Checklist Test Suite', () => {
    it('Test Post, Get, Put, Delete checklist', () => {
        /** post request - create a card */
        cy.request({
            method: 'post',
            url: 'cards',
            qs: {
                idList: id,
                key,
                token
            },
            body: postbody,
            failOnStatusCode: false
        })
        /** another way */
        // cy.request('post', `cards?idList=${id}&key=${key}&token=${token}`, postbody)
        .then(({status, body: {id}}) => {
            expect(status).to.eq(200)
            expect(id).not.null.and.undefined.and.not.empty
            return id
        })
        .then(id => {
            /** post request - create a checklist */
            cy.request({
                method: 'post',
                url: 'checklists',
                qs: {
                    idCard: id,
                    key,
                    token
                },
                failOnStatusCode: false
            })
            /** another way */
            // cy.request('post', `checklists?idCard=${id}&key=${key}&token=${token}`)
            .then(({status, body: {id}}) => {
                expect(status).to.eq(200)
                expect(id).not.null.and.undefined.and.not.empty
                return id
            })
        })
        .then(id => {
            /** get request - get the checklist */
            cy.request({
                url: `checklists/${id}`,
                qs: {
                    key,
                    token
                },
                failOnStatusCode: false
            })
            /** another way */
            // cy.request(`checklists/${id}?key=${key}&token=${token}`)
            .its('status').should('eq', 200)
            
            /** update request - update checklist */
            const name = 'mychecklist'
            const pos = 'top'
            cy.request({
                method: 'put',
                url: `checklists/${id}`,
                qs: {
                    key,
                    token,
                    name,
                    pos
                },
                failOnStatusCode: false
            })
            /** another way */
            // cy.request('put', `checklists/${id}?key=${key}&token=${token}&name=${name}&pos=${pos}`)
            .then(({status, body: {id, name, pos, idCard} }) => {
                expect(status).to.eq(200)
                expect(name).to.eq('mychecklist')
                expect(pos).to.eq(16384)

                /** delete request - delete checklist */
                cy.request({
                    method: 'delete',
                    url: `checklists/${id}`,
                    qs: {
                        key,
                        token
                    },
                    failOnStatusCode: false
                })
                /** another way */
                // cy.request('delete', `checklists/${id}?key=${key}&token=${token}`)
                .then(({status, body: {limits}}) => {
                    expect(status).to.eq(200)
                    expect(Object.values(limits)).to.have.lengthOf(0)
                })

                /** delete request - delete card */
                cy.request({
                    method: 'delete',
                    url: `cards/${idCard}`,
                    qs: {
                        key: key,
                        token: token
                    },
                    failOnStatusCode: false
                })
                /** another way */
                // cy.request('delete', `/1/cards/${idCard}?key=${key}&token=${token}`)
                .then(({status, body: {limits}}) => {
                    expect(status).to.eq(200)
                    expect(Object.values(limits)).to.have.lengthOf(0)
                })
            })
        })
    })
})