import React, {useRef} from 'react'
import {Controller, SubmitHandler, useForm} from 'react-hook-form'
import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import NumberFormat from 'react-number-format'

type AddUserPropsType = {
    titles: string[]
}

export type Inputs = {
    id: number
    firstName: string
    lastName: string
    email: string
    phone: string
}

const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

export const AddUser: React.FC<AddUserPropsType> = ({titles}) => {

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
            .email('Email is invalid'),
    });

    const {register, handleSubmit, formState: {errors, isValid}, control,reset, setValue } = useForm<Inputs>({
        mode: "onChange",
        resolver: yupResolver(validationSchema)
    });
    const phoneRef = useRef(null)

    const onSubmit: SubmitHandler<Inputs> = (data, e) => {
        console.log(data)
        reset(e?.target.reset())
        setValue('phone', '')
    }

    return (
        <>
            <form id={'newUser'} onSubmit={handleSubmit(onSubmit)}/>
            <tr style={{width: '100%'}}>
                <td>{<input type={'number'}
                            form={'newUser'} {...register('id')}/>}
                    {errors.id && <span>{errors.id.message}</span>}
                </td>
                <td>{<input form={'newUser'} {...register('firstName')}/>}
                    {errors.firstName && <span>{errors.firstName.message}</span>}
                </td>
                <td>{<input form={'newUser'} {...register('lastName')}/>}
                    {errors.lastName && <span>{errors.lastName.message}</span>}
                </td>
                <td>{<input type={'email'} form={'newUser'} {...register('email')}/>}
                    {errors.email && <span>{errors.email.message}</span>}
                </td>
                <td>
                    {<Controller
                        control={control}
                        render={({field}) => (
                            <NumberFormat {...field} ref={phoneRef} format={'(###)###-####'}/>
                        )}
                        name={'phone'}/>}
                    {errors.phone && <span>{errors.phone.message}</span>}
                </td>
                <td><input form={'newUser'} disabled={!isValid} type="submit"/></td>
            </tr>
        </>
    )
}