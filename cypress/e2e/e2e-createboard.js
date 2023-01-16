/// <reference types="cypress"/>
import auth from "../fixtures/auth.json"
import board from "../fixtures/board.json"

describe('Trello API Board Test Suite', () => {
    it('Test Post, Get, Put and Delete Board', () => {
        cy.request({
            method: 'Post',
            url: 'boards',
            qs: {
                key: auth.key,
                token: auth.token,
                name: board.name
            },
            failOnStatusCode: false
        }).then(res => {
            expect(res.status).to.eq(200)
            expect(res.statusText).to.eq('OK')
            expect(res.isOkStatusCode).to.be.true
            expect(res.body.name).to.eq(board.name)
            cy.request({
                method: 'Get',
                url: `boards/${res.body.id}`,
                qs: {
                    key: auth.key,
                    token: auth.token
                }
            }).its('body.id').should('exist')
            cy.request({
                method: 'Put',
                url: `boards/${res.body.id}`,
                qs: {
                    key: auth.key,
                    token: auth.token,
                    'prefs/permissionLevel': board.permissionLevel
                }
            }).its('body.prefs.permissionLevel').should('contain', board.permissionLevel)
            cy.request({
                method:'Delete', 
                url: `boards/${res.body.id}`,
                qs: {
                    key: auth.key,
                    token: auth.token
                }
            }).then(res => {
                expect(res.status).to.eq(200)
                expect(res.body._value).to.be.null
            })
        })
    })
})