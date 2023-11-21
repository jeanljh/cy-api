/// <reference types="cypress"/>
import { key, token } from "../fixtures/auth.json"
import { id as idBoard } from "../fixtures/board.json"

describe('Trello API List Test Suite', () => {
    it('Test Post, Get and Update List', () => {
        const name = 'List_' + Math.random().toString(36).substring(5)
        cy.request({
            method: 'Post',
            url: 'lists',
            qs: {
                name: name,
                idBoard,
                key,
                token
            },
            failOnStatusCode: false
        }).then(res => {
            cy.log(res.body.id)
            expect(res.status).to.eq(200)
            expect(res.body.name).to.eq(name)
            cy.request({
                url: `boards/${idBoard}/lists`,
                qs: { key, token },
                failOnStatusCode: false
            }).its('body').then(body => {
                for (const b of body) {
                    if (b.id === res.body.id) {
                        expect(b.name).to.eq(name)
                        break
                    }
                }
            })
            cy.request({
                method: 'put',
                url: 'lists/' + res.body.id,
                qs: { key, token },
                body: {
                    closed: true
                },
                failOnStatusCode: false
            }).then(res => {
                expect(res.status).to.eq(200)
                expect(res.body.closed).to.be.true
            })
        })
    })
})