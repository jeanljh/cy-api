/// <reference types="cypress"/>
import { key, token } from "../fixtures/auth.json"
import { id as idBoard } from "../fixtures/board.json"

describe('Trello API List Test Suite', () => {
    it('Test Post, Get and Update List', () => {
        const listName = 'List_' + Math.random().toString(36).substring(5)
        cy.request({
            method: 'Post',
            url: 'lists',
            qs: {
                name: listName,
                idBoard,
                key,
                token
            },
            failOnStatusCode: false
        }).then(({ status, body: { id, name }}) => {
            expect(status).to.eq(200)
            expect(name).to.eq(listName)
            cy.request({
                url: `boards/${idBoard}/lists`,
                qs: { key, token },
                failOnStatusCode: false
            })
            .its('body')
            .invoke('filter', b => b.id === id)
            .invoke('every', b => b.name === listName)
            /** another way */
            // .then(body => {
            //     expect(body.filter(b => b.id === res.body.id).every(b => b.name === name)).to.be.true
            //     /** another way */
            //     // for (const b of body) {
            //     //     if (b.id === res.body.id) {
            //     //         expect(b.name).to.eq(name)
            //     //         break
            //     //     }
            //     // }
            // })
            cy.request({
                method: 'put',
                url: 'lists/' + id,
                qs: { key, token },
                body: {
                    closed: true
                },
                failOnStatusCode: false
            }).then(({ status, body: { closed }}) => {
                expect(status).to.eq(200)
                expect(closed).to.be.true
            })
        })
    })
})
