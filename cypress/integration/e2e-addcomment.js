/// <reference types="cypress"/>
import auth from '../fixtures/auth.json'
import list from '../fixtures/list.json'
import comment from '../fixtures/comment.json'

describe('Trello API Comment Test Suite', () => {
    it('Test Post, Get and Delete comment', () => {
        // post request - create card
        cy.request({
            method: 'post',
            url: '1/cards/',
            qs: {
                idList: list.id,
                key: auth.key,
                token: auth.token
            },
            failOnStatusCode: false
        })
        .its('body.id')
        .then(cardId => {
            // post request - add comment
            cy.request({
                method: 'post',
                url: `1/cards/${cardId}/actions/comments`,
                qs: { 
                    text: comment.text,
                    key: auth.key,
                    token: auth.token
                },
                failOnStatusCode: false
            })
            .then(res => {
                expect(res.body.data.text).to.eq(comment.text)
                // delete request - delete comment
                cy.request({
                    method: 'Delete',
                    url: `/1/cards/${cardId}/actions/${res.body.id}/comments`,
                    qs: {
                        key: auth.key,
                        token: auth.token
                    },
                    failOnStatusCode: false
                }).its('status').should('eq', 200)
            })
            // delete request - delete card
            cy.request({
                method: 'Delete',
                url: `/1/cards/${cardId}`,
                qs: {
                    key: auth.key,
                    token: auth.token
                },
                failOnStatusCode: false
            }).its('status').should('eq', 200)
        })
    })
})