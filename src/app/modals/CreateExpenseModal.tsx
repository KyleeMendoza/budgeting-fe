import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Modal,
  Pressable,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { DropDown } from "@/components/DropDown";

//redux
import { IRootState } from "store";
import { useSelector, useDispatch } from "react-redux";
import { setCloseCreateModal } from "@/Slice/modalSlice";

//API
import getterService from "@/services/getter.service";

interface FormData {
  category: string;
  percent: string;
}

export default function CreateExpensesModal() {
  const dispatch = useDispatch();
  const createModal = useSelector(
    (state: IRootState) => state.modal.createModal
  );
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getterService.getCategories();
        const transformedData = response.data.map((item) => ({
          label: item.categories,
          value: item.categories,
        }));
        setCategories(transformedData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: "",
      percent: "",
    },
  });

  const onSubmit = (data: FormData) => {
    const percent = data.percent;
    const category = data.category;

    console.log("percent: ", percent);
    console.log("category: ", category);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={createModal}
      onRequestClose={() => {
        dispatch(setCloseCreateModal());
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView} className="flex flex-col gap-4">
          <Text className="font-['Poppins-Bold'] text-lg">
            Create Budget Statement.
          </Text>
          <View className="w-full flex flex-col gap-4 mt-2">
            <View className="w-full flex gap-5">
              <View className="entry-container flex gap-2">
                <View className="category-container w-full">
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <DropDown
                        filter={categories}
                        value={value}
                        setter={onChange}
                      />
                    )}
                    name="category"
                  />
                  {errors.category && (
                    <Text className="text-sm text-red-600 italic">
                      This field is required.
                    </Text>
                  )}
                </View>
                <View className="amount-container w-full">
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        mode="outlined"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        activeOutlineColor="#1bcf9a"
                        outlineStyle={{ backgroundColor: "white" }}
                        contentStyle={{ color: "black" }}
                        placeholder="Percent"
                        keyboardType="numeric"
                        right={<TextInput.Affix text="%" />}
                      />
                    )}
                    name="percent"
                  />
                  {errors.percent && (
                    <Text className="text-sm text-red-600 italic">
                      This field is required.
                    </Text>
                  )}
                </View>
              </View>
            </View>
            <View className="w-full">
              <Button
                mode="contained"
                uppercase
                onPress={handleSubmit(onSubmit)}
                style={{
                  borderRadius: 20,
                  paddingVertical: 5,
                  backgroundColor: "#00bfa5",
                }}
                labelStyle={{ fontSize: 16 }}
              >
                Confirm
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 25,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    // textAlign: "center",
  },
});
