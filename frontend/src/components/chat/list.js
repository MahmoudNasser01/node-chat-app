import { HStack, StackDivider, Text, VStack } from '@chakra-ui/react'

const List = () => {
    const tasks = [
        { check: false, id: '2', body: 'test' },
        { check: false, id: '3', body: 'user2' },
    ]
    const checkTask = (id) => {}
    return (
        <VStack
            divider={<StackDivider />}
            borderWidth="2px"
            p="5"
            w="100%"
            bg="#fff8"
            alignItems="stretch"
        >
            {tasks.map((task) => (
                <HStack key={task.id}>
                    <Text
                        w="100%"
                        p="8px"
                        borderRadius="lg"
                        bg="#ffffffee"
                        cursor="pointer"
                        onClick={() => checkTask(task.id)}
                    >
                        {task.body}
                    </Text>
                </HStack>
            ))}
        </VStack>
    )
}
export default List
