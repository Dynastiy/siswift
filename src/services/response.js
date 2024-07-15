/* eslint-disable no-prototype-builtins */
import { useToast } from 'vue-toastification'

const toast = useToast()
export const catchAxiosError = (error) => {
  // if (error?.data) {
  //   const responseData = error.data
  //   if (responseData.message) {
  //     toast.error(responseData.message, {
  //       timeout: 4000
  //     })
  //   }

  //   if (responseData.errors) {
  //     for (const key in responseData.errors) {
  //       if (responseData.errors.hasOwnProperty(key)) {
  //         responseData.errors[key].forEach((errorMessage) => {
  //           toast.error(errorMessage, {
  //             timeout: 6000
  //           })
  //         })
  //       }
  //     }
  //   }
  // } else {
  //   toast.error('An error occurred.', {
  //     timeout: 4000
  //   })
  // }
  if (error) {
    toast.success(error, {
      timeout: 4000
    })
  }
}
// export const catchAxiosError = (error) => {
//       console.log(error.response?.data?.message)

//   if (error.response?.data?.message) {
//     // Handle the main error message
//     toast.error(error.response.data.message, {
//       timeout: 4000
//     })
//   } else if (error.response?.data?.errors) {
//     // Handle validation errors
//     for (const key in error.response.data.errors) {
//       if (error.response.data.errors.hasOwnProperty(key)) {
//         toast.error(error.response.data.errors[key][0], {
//           timeout: 18000
//         })
//       }
//     }
//   } else {
//     // Handle generic error when no specific message is available
//     toast.error('An error occurred.', {
//       timeout: 4000
//     })
//   }
// }
// export const catchAxiosError = (error) => {

//     console.log(error.response?.data?.message)

//     if (error.response?.data?.message) {
//       toast.error(error.response?.data?.message, {
//         timeout: 4000
//       })
//     }

//     if(error.response?.data?.errors){
//         for (let key in error.response.data.errors) {
//             toast.error(error.response.data.errors[key][0], {
//                 timeout: 18000,
//             });
//         }
//     }

// }

export const catchAxiosSuccess = (res) => {
  // console.log(res?.message?.success, 'from:response')
  // if (res?.data?.message) {
  //   toast.success(res.data.message, {
  //     timeout: 4000
  //   })
  // }

  if (res) {
    toast.success(res, {
      timeout: 4000
    })
  }

  // if (res?.message) {
  //   toast.success(res.message, {
  //     timeout: 4000
  //   })
  // }

  // if (res?.data?.message?.success) {
  //   toast.success(res.data.message.success, {
  //     timeout: 4000
  //   })
  // }

  // Display individual success messages
  // if (res?.message?.success) {
  //   for (let i = 0; i < res?.message?.success.length; i++) {
  //     toast.success(res?.message?.success[i], {
  //       timeout: 4000
  //     })
  //   }
  //   res?.message?success.forEach((successMessage) => {
  //     toast.success(successMessage, {
  //       timeout: 4000
  //     });
  //   })
  // }
}

export default { catchAxiosError, catchAxiosSuccess }
