import { updateSetting } from "../../services/apiSettings"
import Form from "../../ui/Form"
import FormRow from "../../ui/FormRow"
import Input from "../../ui/Input"
import { useSettings } from "./useSettings"
import { useUpdateSetting } from "./useUpdateSettings"

function UpdateSettingsForm() {
  const { isLoading, settings: { min_bookings, max_bookings, max_guests, breakfast_price } = {} } =
    useSettings()

  const { isUpdating, udpateSetting } = useUpdateSetting()

  function handleUpdate(e, field) {
    const value = e.target.value
    if (!value) return
    udpateSetting({ [field]: value })
  }

  if (isLoading) return
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={min_bookings}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "min_bookings")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={max_bookings}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "max_bookings")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={max_guests}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "max_guests")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfast_price}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "breakfast_price")}
        />
      </FormRow>
    </Form>
  )
}

export default UpdateSettingsForm
