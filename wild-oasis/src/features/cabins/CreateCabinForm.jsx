/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form"
import Input from "../../ui/Input"
import Form from "../../ui/Form"
import Button from "../../ui/Button"
import FileInput from "../../ui/FileInput"
import Textarea from "../../ui/Textarea"
import FormRow from "../../ui/FormRow"
import { useCreateCabin } from "./useCreateCabin"
import { useUpdateCabin } from "./useUpdateCabin"

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: cabinId, ...editValues } = cabinToEdit
  const isEditing = Boolean(cabinId)

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditing ? editValues : {},
  })
  const { errors } = formState

  const { isCreating, createCabin } = useCreateCabin()
  const { isUpdating, udpateCabin } = useUpdateCabin()

  const isProcessingForm = isCreating || isUpdating

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0]

    if (isEditing) {
      udpateCabin(
        {
          newCabinData: { ...data, image },
          cabinId: cabinId,
        },
        {
          onSuccess: (data) => {
            reset()
            onCloseModal?.()
          },
        }
      )
    } else {
      createCabin(
        { ...data, image },
        {
          onSuccess: (data) => {
            reset()
            onCloseModal?.()
          },
        }
      )
    }
  }

  function onError(error) {}

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isProcessingForm}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isProcessingForm}
          {...register("max_capacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isProcessingForm}
          {...register("regular_price", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isProcessingForm}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regular_price || "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          disabled={isProcessingForm}
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: isEditing ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isProcessingForm}>{isEditing ? "Edit cabin" : "Add cabin"}</Button>
      </FormRow>
    </Form>
  )
}

export default CreateCabinForm
