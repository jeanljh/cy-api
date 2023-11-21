/// <reference types='cypress'/>
import { key, token } from '../fixtures/auth.json'
import { id as idList, postbody } from '../fixtures/list.json'

describe('Trello API Attachment Test Suite ', () => {
    it('Test Post, Get, Delete attachment', () => {
        /** post request - create a card */
        cy.request({
            method: 'post',
            url: `cards?idList=${idList}&key=${key}&token=${token}`,
            body: postbody,
            failOnStatusCode: false
        })
        .its('body.id')
        .then(idList => {
            expect(idList).not.null.and.undefined.and.empty
            
            /** post request - create an attachment */
            cy.request({
                method: 'post',
                url: `cards/${idList}/attachments`,
                qs: {
                    url: 'https://trello.com/',
                    key,
                    token
                },
                failOnStatusCode: false
            })
            .then(({body: { id, url }}) => {
                expect(url).eq('https://trello.com/')
                
                /** get request - get the attachment */
                cy.request({
                    url: `cards/${idList}/attachments/${id}?key=${key}&token=${token}`,
                    failOnStatusCode: false
                })
                .its('body.id')
                .should('eq', id)
                
                /** delete request - delete the attachment */
                cy.request({
                    method: 'delete',
                    url: `cards/${idList}/attachments/${id}?key=${key}&token=${token}`,
                    failOnStatusCode: false
                })
                .its('body.limits')
                .should('be.empty')
            })
            /** delete request - delete the card */
            cy.request({
                method: 'delete',
                url: `cards/${idList}?key=${key}&token=${token}`,
                failOnStatusCode: false
            })
            .its('body.limits')
            .should('be.empty')
        })
    })
})