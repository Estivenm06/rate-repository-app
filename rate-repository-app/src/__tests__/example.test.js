import { View, Text, Pressable, TextInput } from "react-native";
import {fireEvent, render, screen} from '@testing-library/react-native'
import React, {useState} from "react";

const Greetings = ({name}) => {
    return (
        <View>
            <Text>Hello {name}!</Text>
        </View>
    )
}

const Form = ({onSubmit}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        onSubmit({username, password})
    }

    return (
        <View>
        <View>
        <TextInput
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholder="Username"
        />
        </View>
        <View>
        <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Password"
        />
        </View>
        <View>
            <Pressable onPress={handleSubmit}>
                <Text>Submit</Text>
            </Pressable>
        </View>
        </View>
    )
}

describe('Example', () => {
    it('works', () => {
        expect(1).toBe(1);
    })
})

describe('Greeting', () => {
    it('renders a greeting message based on the name prop', () => {
        render(<Greetings name='Kalle'/>)
        
        screen.debug()

        expect(screen.getByText('Hello Kalle!')).toBeDefined();
    })
})

describe('Form', () => {
    it('calls a function provided by onSubmit prop after pressing the submit button', () => {
        const onSubmit = jest.fn()
        render(<Form onSubmit={onSubmit}/>)

        fireEvent.changeText(screen.getByPlaceholderText('Username'), 'kalle')
        fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password')
        fireEvent.press(screen.getByText('Submit'))

        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
            username: 'kalle',
            password: 'password'
        })
    })
})