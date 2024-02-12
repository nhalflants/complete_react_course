import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { createEditCabin } from "../../services/apiCabins"

export function useUpdateCabin() {
  const queryClient = useQueryClient()

  const { isLoading: isUpdating, mutate: udpateCabin } = useMutation({
    mutationFn: ({ newCabinData, cabinId }) => createEditCabin(newCabinData, cabinId),
    onSuccess: () => {
      toast.success("Cabin successfully updated")
      queryClient.invalidateQueries({ queryKey: ["cabins"] })
    },
    onError: (error) => toast.error(error.message),
  })

  return { isUpdating, udpateCabin }
}
