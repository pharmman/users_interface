import React, {useRef} from 'react'
import {Controller, useFormContext} from 'react-hook-form'
import NumberFormat from 'react-number-format'

type AddUserPropsType = {
    toggleAddUser: (condition: boolean) => void
}

export const AddUser: React.FC<AddUserPropsType> = ({toggleAddUser}) => {
    const phoneRef = useRef(null)

    const {formState:{errors, isValid}, register, control} = useFormContext()

    return (
        <>
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
                            <NumberFormat autoComplete={'new-password'} {...field} ref={phoneRef}
                                          format={'(###)###-####'} mask={' '}/>
                        )}
                        name={'phone'}/>}
                    {errors.phone && <span>{errors.phone.message}</span>}
                </td>
                <td>
                    <button form={'newUser'} disabled={!isValid} type="submit">Add to table</button>
                </td>
            </tr>
        </>
    )
}