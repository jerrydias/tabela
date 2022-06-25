import React from "react";
import { Input, IconButton, Checkbox, Text, Box, VStack, HStack, Heading, Icon, Center, useToast, NativeBaseProvider, View,Image} from "native-base";
import { Feather, Entypo } from "@expo/vector-icons";


const Example = () => {
  const instState = [{
    title: "o clube Hellfire",
    isCompleted: true
  }, {
    title: "A maldição de Vecna",
    isCompleted: false
  }, {
    title: "O monstro e super-heroína",
    isCompleted: false
  }, {
    title: "Querido Billy",
    isCompleted: false
  }, {
    title: "projeto Nina",
    isCompleted: false
  }];
  
  const [list, setList] = React.useState(instState);
  const [inputValue, setInputValue] = React.useState("");
  const toast = useToast();

  const addItem = title => {
    if (title === "") {
      toast.show({
        title: "Please Enter Text",
        status: "warning"
      });
      return;
    }

    setList(prevList => {
      return [...prevList, {
        title: title,
        isCompleted: false
      }];
    });
  };

  const handleDelete = index => {
    setList(prevList => {
      const temp = prevList.filter((_, itemI) => itemI !== index);
      return temp;
    });
  };

  const handleStatusChange = index => {
    setList(prevList => {
      const newList = [...prevList];
      newList[index].isCompleted = !newList[index].isCompleted;
      return newList;
    });
  };

  return <Center w="100%" >
      <View>
        <Image
          source={require('./img/bg2.png')} 
          style={{ width: 300, height: 180 }}
          alt="image" alignItems="center" 
          />
      </View>
      <Box maxW="300" w="100%" >
        <Heading mb="2" size="md">
            <center>Coisas Estranhas</center>           
            <center>Stranger Things</center>
        </Heading>
        <VStack space={4}>
          <HStack space={2}>
            <Input flex={1} onChangeText={v => setInputValue(v)} value={inputValue} placeholder="Add Task(capítulo)" />
            <IconButton borderRadius="sm" variant="solid" icon={<Icon as={Feather} name="plus" size="sm" color="warmGray.50" />} onPress={() => {
            addItem(inputValue);
            setInputValue("");
          }} />
          </HStack>
          <VStack space={2}>
            {list.map((item, itemI) => <HStack w="100%" justifyContent="space-between" alignItems="center" key={item.title + itemI.toString()}>
                <Checkbox isChecked={item.isCompleted} onChange={() => handleStatusChange(itemI)} value={item.title}></Checkbox>
                <Text width="100%" flexShrink={1} textAlign="left" mx="2" strikeThrough={item.isCompleted} _light={{
              color: item.isCompleted ? "gray.400" : "coolGray.800"
            }} _dark={{
              color: item.isCompleted ? "gray.400" : "coolGray.50"
            }} onPress={() => handleStatusChange(itemI)}>
                  {item.title}
                </Text>
                <IconButton size="sm" colorScheme="trueGray" icon={<Icon as={Entypo} name="minus" size="xs" color="trueGray.400" />} onPress={() => handleDelete(itemI)} />
              </HStack>)}
          </VStack>
        </VStack>
      </Box>
    </Center>;
};

    export default () => {
        return (
          <NativeBaseProvider>
            <Center flex={1} px="3">
                <Example />
            </Center>
          </NativeBaseProvider>
        );
    };

    