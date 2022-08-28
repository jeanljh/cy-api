/// <reference types='cypress' />
import auth from '../fixtures/auth.json'
import board from '../fixtures/board.json'
import member from '../fixtures/member.json'

describe('Trello API Member Test Suite', () => {
    it('Test Put and Delete member', () => {
        // put request - invite member
        cy.request({
            method: 'put',
            url: `1/boards/${board.id}/members`,
            qs: {
                email: member.email,
                type: member.type,
                key: auth.key,
                token: auth.token
            },
        })
        .its('body')
        .then(b => {
            var posMember = b.members.length -1
            var idMember = b.members[posMember].id
            var posMembership = b.memberships.findIndex(m => m.idMember === idMember)
            expect(posMember).not.eq(-1)
            expect(b.memberships[posMembership].memberType).to.eq('normal')
            // post request - delete member
            cy.request({
                method: 'delete',
                url: `1/boards/${board.id}/members/${idMember}`,
                qs: {
                    key: auth.key,
                    token: auth.token
                }
            })
            .its('body.members')
            .invoke('findIndex', m => m.id === idMember)
            .should('eq', -1)
        })
    })
})