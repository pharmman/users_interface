import React, {useCallback, useState} from 'react'
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form'
import {addUser, UserType} from '../users-reducer'
import {useDispatch} from 'react-redux'
import {yupResolver} from '@hookform/resolvers/yup'
import {Button} from '@material-ui/core'
import {Table} from './Table'
import * as Yup from 'yup'
import {SortConfigType} from '../../useSorting'

export type TitlesType = keyof Omit<UserType, 'address'>

type TableContainerPropsType = {
    setSortingField: (key: keyof UserType | null) => void
    sortingField: SortConfigType
    setCurrentUserHandler: (user: UserType) => void
    data: UserType[]
}

type Inputs = {
    id: number
    firstName: string
    lastName: string
    email: string
    phone: string
}
const phoneRegExp = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im

const validationSchema = Yup.object().shape({
    id: Yup.string()
        .required('Id is required'),
    firstName: Yup.string()
        .required('First Name is required'),
    lastName: Yup.string()
        .required('Last name is required'),
    phone: Yup.string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .required('Phone is required'),
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid')
})



export const TableContainer: React.FC<TableContainerPropsType> = React.memo(({
                                                                                 setSortingField,
                                                                                 sortingField,
                                                                                 setCurrentUserHandler,
                                                                                 data
                                                                             }) => {
    const dispatch = useDispatch()
    const [attachUser, setAttachUser] = useState<boolean>(false)
    const titles: TitlesType[] = ['id', 'firstName', 'lastName', 'email', 'phone', 'description']

    //showing inputs
    const setAttachUserHandler = useCallback((state: boolean) => setAttachUser(state), [])

    //add new user
    const formMethods = useForm<Inputs>({
        resolver: yupResolver(validationSchema),
        mode: 'onChange'
    })

    const onSubmit: SubmitHandler<Inputs> = (data, e) => {
        dispatch(addUser({user: data}))
        formMethods.reset(e?.target.reset())
        formMethods.setValue('phone', '')
        setAttachUserHandler(false)
        setSortingField(null)
    }
    return (
        <>
            <Button variant={'contained'} color={'primary'} onClick={() => setAttachUserHandler(true)}>Add User</Button>
            <form id={'newUser'} onSubmit={formMethods.handleSubmit(onSubmit)}>
                <FormProvider {...formMethods} >
                    <Table data={data} setSortingField={setSortingField} sortingField={sortingField}
                           setCurrentUserHandler={setCurrentUserHandler} addUser={attachUser} titles={titles}/>
                </FormProvider>
            </form>
        </>
    )
})