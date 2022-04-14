import {userReducer} from "./user-reducer";

test('use reducer should be correct only age', () => {

    const starState = {age: 20, childrenCount: 1, name: 'Igor'}

    const endState = userReducer({...starState}, {type: 'INCREMENT-AGE'})

    expect(starState.age).toBe(20)
    expect(endState.age).not.toBe(20)
    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(starState.childrenCount)
})


test('user reducer should be correct only childrenCount', () => {
    const startState = {age: 20, childrenCount: 1, name: 'Igor'}

    const endState = userReducer({...startState}, {type: 'INCREMENT-CHILDREN-COUNT'})

    expect(startState.age).toBe(endState.age)
    expect(startState.childrenCount).toBe(1)
    expect(endState.childrenCount).toBe(2)
})


test('user reducer change name of reducer', () => {
    const startState = {age: 20, childrenCount: 1, name: 'Igor'}
    const newName = 'Oleg'
    const endState = userReducer(startState, {type: 'CHANGE-NAME', newName: newName})

    expect(startState.name).toBe('Igor')
    expect(endState.name).toBe('Oleg')
})

