import React, {useRef} from 'react'
import {Controller, SubmitHandler, useForm} from 'react-hook-form'
import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import NumberFormat from 'react-number-format'
import {TitlesType} from '../Table/Table'
import {useDispatch} from 'react-redux'
import {addUser} from '../users-reducer'

type AddUserPropsType = {
    titles: TitlesType[]
    toggleAddUser: (condition: boolean) => void
}

type Inputs = {
    id: number
    firstName: string
    lastName: string
    email: string
    phone: string
}

const phoneRegExp = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im

export const AddUser: React.FC<AddUserPropsType> = ({titles, toggleAddUser}) => {
    const dispatch = useDispatch()
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

    const {register, handleSubmit, formState: {errors, isValid,}, control, reset, setValue } = useForm<Inputs>({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    // for phone mask
    const phoneRef = useRef(null)

    const onSubmit: SubmitHandler<Inputs> = (data, e) => {
        dispatch(addUser({user: data}))
        reset(e?.target.reset())
        setValue('phone', '')
        toggleAddUser(false)
    }

    return (
        <>
            <form id={'newUser'} onSubmit={handleSubmit(onSubmit)}/>
            <tr style={{width: '100%'}}>
                <td>{<input autoComplete={'new-password'} type={'number'}
                            form={'newUser'} {...register('id')}/>}
                    {errors.id && <span>{errors.id.message}</span>}
                </td>
                <td>{<input autoComplete={'new-password'} form={'newUser'} {...register('firstName')}/>}
                    {errors.firstName && <span>{errors.firstName.message}</span>}
                </td>
                <td>{<input autoComplete={'new-password'} form={'newUser'} {...register('lastName')}/>}
                    {errors.lastName && <span>{errors.lastName.message}</span>}
                </td>
                <td>{<input autoComplete={'new-password'} type={'email'} form={'newUser'} {...register('email')}/>}
                    {errors.email && <span>{errors.email.message}</span>}
                </td>
                <td>
                    {<Controller
                        control={control}
                        render={({field}) => (
                            <NumberFormat autoComplete={'new-password'} {...field} ref={phoneRef} format={'(###)###-####'} mask={' '}/>
                        )}
                        name={'phone'}/>}
                    {errors.phone && <span>{errors.phone.message}</span>}
                </td>
                <td><button form={'newUser'} disabled={!isValid} type="submit">Add to table</button></td>
            </tr>
        </>
    )
}