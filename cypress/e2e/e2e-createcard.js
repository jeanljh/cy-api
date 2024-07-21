/// <reference types="cypress"/>
import { key, token } from '../fixtures/auth.json'
import { id as idList, postbody, putbody } from '../fixtures/list.json'

describe('Trello API Card Test Suite', () => {
    it('Test Post, Get, Update and Delete Card', () => {
        // post request
        cy.request({
            method: 'post',
            url: 'cards',
            qs: { idList, key, token },
            body: postbody,
            failOnStatusCode: false
        }).then(({ status, body }) => {
            expect(status).to.eq(200)
            expect(body).to.have.property('name', postbody.name)
            expect(body).to.have.property('desc', postbody.desc)

            // get request
            cy.request({
                url: 'cards/' + body.id,
                qs: { key, token }
            }).its('body.id').should('eq', body.id)

            // put request
            cy.request({
                method: 'put',
                url: 'cards/' + body.id,
                qs: { key, token },
                body: putbody,
                failOnStatusCode: false
            }).its('body').should('deep.include', putbody)

            // delete request
            cy.request({
                method: 'delete',
                url: 'cards/' + body.id,
                qs: { key, token },
                failOnStatusCode: false
            }).its('status').should('eq', 200)

            // get request
            cy.request({
                url: 'cards/' + body.id,
                qs: { key, token },
                failOnStatusCode: false
            }).its('status').should('eq', 404)
        })
    })
})
