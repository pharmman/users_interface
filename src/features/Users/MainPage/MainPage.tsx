import React, {useState} from 'react'
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form'
import {addUser, UserType} from '../users-reducer'
import {useDispatch} from 'react-redux'
import {yupResolver} from '@hookform/resolvers/yup'
import {CurrentUser} from '../CurrentUser/CurrentUser'
import {Button} from '@material-ui/core'
import {SortConfigType} from '../Users'
import {Table, TitlesType} from '../Table/Table'
import * as Yup from 'yup'

type MainPagePropsType = {
    data: UserType[]
    setSortingField: (key: keyof UserType) => void
    sortingField: SortConfigType
    titles: TitlesType[]
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


export const MainPage: React.FC<MainPagePropsType> = ({titles, data, setSortingField, sortingField}) => {
    const dispatch = useDispatch()

    const [currentUser, setCurrentUser] = useState<UserType | null>(null)
    const [attachUser, setAttachUser] = useState<boolean>(false)
    const toggleAddUser = (state: boolean) => {
        setAttachUser(state)
    }

    const formMethods = useForm<Inputs>({
        resolver: yupResolver(validationSchema),
        mode: 'all'
    })

    const onSubmit: SubmitHandler<Inputs> = (data, e) => {
        dispatch(addUser({user: data}))
        formMethods.reset(e?.target.reset())
        formMethods.setValue('phone', '')
        toggleAddUser(false)
    }


    return (
        <div>
            <Button variant={'contained'} color={'primary'} onClick={() => toggleAddUser(true)}>Add User</Button>
            <form id={'newUser'} onSubmit={formMethods.handleSubmit(onSubmit)}>
                <FormProvider {...formMethods} >
                    <Table titles={titles} data={data} setSortingField={setSortingField} sortingField={sortingField}
                           setCurrentUser={setCurrentUser} addUser={attachUser} toggleAddUser={toggleAddUser}/>
                </FormProvider>
            </form>
            {currentUser && <CurrentUser user={currentUser}/>}
        </div>
    )
}