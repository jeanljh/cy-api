/// <reference types="cypress"/>
import auth from '../fixtures/auth.json'
import list from '../fixtures/list.json'

describe('Trello API Card Test Suite', () => {
    it('Test Post, Get, Update and Delete Card', () => {
        // post request
        cy.request({
            method: 'post',
            url: 'cards',
            qs: {
                idList: list.id,
                key: auth.key,
                token: auth.token
            },
            body: list.postbody,
            failOnStatusCode: false
        }).then(res => {
            expect(res.status).to.eq(200)
            expect(res.body).to.have.property('name', list.postbody.name)
            expect(res.body).to.have.property('desc', list.postbody.desc)

            // get request
            cy.request({
                url: `cards/${res.body.id}`,
                qs: {
                    key: auth.key,
                    token: auth.token
                }
            }).its('body.id').should('eq', res.body.id)

            // put request
            cy.request({
                method: 'put',
                url: `cards/${res.body.id}`,
                qs: {
                    key: auth.key,
                    token: auth.token
                },
                body: list.putbody,
                failOnStatusCode: false
            }).its('body').should('deep.include', list.putbody)

            // delete request
            cy.request({
                method: 'delete',
                url: `cards/${res.body.id}`,
                qs: {
                    key: auth.key,
                    token: auth.token
                },
                failOnStatusCode: false
            }).its('status').should('eq', 200)

            // get request
            cy.request({
                url: `cards/${res.body.id}`,
                qs: {
                    key: auth.key,
                    token: auth.token
                },
                failOnStatusCode: false
            }).its('status').should('eq', 404)
        })
    })
})