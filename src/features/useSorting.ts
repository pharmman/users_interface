import {useState} from 'react'
import {SortConfigType} from './Users/Users'
import {UserType} from './Users/users-reducer'

export const useSorting = (data:Array<any>) => {
    const [sortingField, setSortingField] = useState<SortConfigType>({
        key: null,
        direction: "up"
    })

    let sortedData = [...data]

    const sorting = (key: keyof UserType) => {
        let direction = 'up';
        if (sortingField.key === key && sortingField.direction === 'up') {
            direction = 'down';
        }
        setSortingField({key, direction});
    }

    const {key} = sortingField
    if (key) {
        sortedData.sort((a, b) => {
                if (a[key] < b[key]) {
                    return sortingField.direction === 'up' ? -1 : 1;
                }
                if (a[sortingField.key as keyof UserType] > b[sortingField.key as keyof UserType]) {
                    return sortingField.direction === 'up' ? 1 : -1;
                }
                return 0;
            }
        )
    }

    return {sorting, sortingField, sortedData}
}