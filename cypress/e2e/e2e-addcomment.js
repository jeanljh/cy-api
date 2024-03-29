/// <reference types="cypress"/>
import { key, token } from '../fixtures/auth.json'
import { id as idList } from '../fixtures/list.json'
import comment from '../fixtures/comment.json'

describe('Trello API Comment Test Suite', () => {
    it('Test Post, Get and Delete comment', () => {
        // post request - create card
        cy.request({
            method: 'post',
            url: 'cards',
            qs: { idList, key, token },
            failOnStatusCode: false
        })
        .its('body.id')
        .then(cardId => {
            // post request - add comment
            cy.request({
                method: 'post',
                url: `cards/${cardId}/actions/comments`,
                qs: { 
                    text: comment.text, 
                    key, 
                    token 
                },
                failOnStatusCode: false
            })
            .then(res => {
                expect(res.body.data.text).to.eq(comment.text)
                // delete request - delete comment
                cy.request({
                    method: 'Delete',
                    url: `cards/${cardId}/actions/${res.body.id}/comments`,
                    qs: { key, token },
                    failOnStatusCode: false
                }).its('status').should('eq', 200)
            })
            // delete request - delete card
            cy.request({
                method: 'Delete',
                url: 'cards/' + cardId,
                qs: { key, token },
                failOnStatusCode: false
            }).its('status').should('eq', 200)
        })
    })
})