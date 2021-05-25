import {applicationReducer, AppReducerType, setAppError, setAppLoading} from '../application-reducer'


describe('Application reducer test', () => {
    let state: AppReducerType
    beforeEach(() => {
        state = {
            error: '',
            loading: false
        }
    })
    it('error should change', () => {
        const action = (setAppError({error: 'Test error'}))

        const newState = applicationReducer(state, action)

        expect(newState.error).toBe('Test error')
        expect(newState.loading).toBeFalsy()
    })
    it('loading should change', () => {
        const action = (setAppLoading({loading: true}))
        const newState = applicationReducer(state, action)

        expect(newState.error).toBe('')
        expect(newState.loading).toBeTruthy()
    })
})