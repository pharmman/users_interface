import {addUser, getUsers, noAddress, usersReducer, UserType} from './users-reducer'

describe('users-reducer test', () => {
    let startState: UserType[]

    beforeEach(() => {
        startState = [
            {
                'id': 503,
                'firstName': 'Donna',
                'lastName': 'Meyers',
                'email': 'GLehman@aliquam.com',
                'phone': '(449)252-8126',
                'address': {
                    'streetAddress': '3198 Tincidunt Ave',
                    'city': 'Williamstown',
                    'state': 'MI',
                    'zip': '27365'
                },
                'description': 'magna sed ante curabitur ante ante porttitor porttitor placerat vitae lorem libero dolor aliquam et etiam curabitur amet sollicitudin consequat pulvinar sed scelerisque vitae nec aliquam tellus sit velit ante mattis adipiscing'
            },
            {
                'id': 55,
                'firstName': 'Danka',
                'lastName': 'Callison',
                'email': 'MRamirez@curabitur.com',
                'phone': '(318)362-4211',
                'address': {
                    'streetAddress': '5253 Sollicitudin Ave',
                    'city': 'Sebring',
                    'state': 'SD',
                    'zip': '17614'
                },
                'description': 'consequat aenean sit augue elit aliquam aenean massa nec tincidunt vitae vel elit tincidunt elit nec lacus scelerisque adipiscing pharetra elementum orci sapien id massa neque vestibulum malesuada tortor quis sed libero'
            }
        ]
    })
    it('users should be change', () => {
        const requestPayload = [
            {
                'id': 128,
                'firstName': 'Quamika',
                'lastName': 'Pickett',
                'email': 'JZuniga@turpis.io',
                'phone': '(181)948-3819',
                'address': {
                    'streetAddress': '4568 Magna Rd',
                    'city': 'Andover',
                    'state': 'DE',
                    'zip': '89630'
                },
                'description': 'amet sit lacus vestibulum facilisis lorem etiam sed dolor tortor quis et sollicitudin curabitur tortor sit risus dolor adipiscing amet magna rutrum massa amet tortor molestie placerat fringilla donec pretium magna amet'
            },
            {
                'id': 482,
                'firstName': 'Kenya',
                'lastName': 'Tapia',
                'email': 'CTang@molestie.ly',
                'phone': '(275)648-7572',
                'address': {
                    'streetAddress': '2735 Tempor Ln',
                    'city': 'Andover',
                    'state': 'OK',
                    'zip': '33214'
                },
                'description': 'aenean mattis amet lacus amet lorem lorem mattis magna consequat sit ipsum lacus lectus aliquam dui massa mattis tortor odio lorem ac convallis massa dui risus ipsum vel sollicitudin curabitur pulvinar sollicitudin'
            },
            {
                'id': 262,
                'firstName': 'Lise',
                'lastName': 'Batson',
                'email': 'BLevin@ac.com',
                'phone': '(779)241-1418',
                'address': {
                    'streetAddress': '2410 Ac Ct',
                    'city': 'Panama City Beach',
                    'state': 'IN',
                    'zip': '16222'
                },
                'description': 'tortor eros ac lectus orci fringilla pulvinar morbi pharetra eros hendrerit lacus non donec suspendisse lorem placerat donec velit ipsum quis tellus porttitor sollicitudin molestie massa consequat elit non et pretium etiam'
            },
            {
                'id': 469,
                'firstName': 'Aydin',
                'lastName': 'Presas',
                'email': 'VDixon@tortor.gov',
                'phone': '(383)299-3251',
                'address': {
                    'streetAddress': '6478 Nullam Dr',
                    'city': 'Glencoe',
                    'state': 'VT',
                    'zip': '69460'
                },
                'description': 'pretium tortor vitae lorem ac mattis lorem magna consectetur tincidunt et velit scelerisque et molestie lacus lacus placerat ante porta lorem dolor lectus etiam tellus sed massa sagittis vel facilisis magna mattis'
            }
        ]
        const action = getUsers.fulfilled({users: requestPayload}, 'requestId', 'big')

        const endState = usersReducer(startState, action)

        expect(endState).toEqual(requestPayload)
    })

    it('should be add new user', () => {
        const user: UserType = {
            id: 1,
            description: 'No description',
            email: 'testEmail',
            firstName: 'testFirstName',
            lastName: 'testLastName',
            phone: 'testPhone',
            address: noAddress
        }

        const action = addUser({user})
        const endState = usersReducer(startState, action)

        expect(endState).toEqual([user, ...startState])
    })
})



