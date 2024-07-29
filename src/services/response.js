/* eslint-disable no-prototype-builtins */
import { useToast } from 'vue-toastification'

const toast = useToast()
export const catchAxiosError = (error) => {
  const responseData = error.message
  if (error) {
    console.log(responseData, 'errror')
    if (responseData.error) {
      responseData.error.forEach((errorMessage) => {
        toast.error(errorMessage, {
          timeout: 4000
        })
      })
    } else if (Array.isArray(responseData)) {
      responseData.forEach((errorMessage) => {
        toast.error(errorMessage, {
          timeout: 4000
        })
      })
    } else {
      toast.error(responseData, {
        timeout: 4000
      })
    }

    // if (responseData.error) {
    //   for (const key in responseData.error) {
    //     if (responseData.error.hasOwnProperty(key)) {
    //       responseData.errors[key].forEach((errorMessage) => {
    //         toast.error(errorMessage, {
    //           timeout: 4000
    //         })
    //       })
    //     }
    //   }
    // }
  } else {
    toast.error('An error occurred.', {
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
  console.log(res, 'from:response')
  // if (res?.data?.message) {
  //   toast.success(res.data.message, {
  //     timeout: 4000
  //   })
  // }

  // if (res) {
  //   toast.success(res, {
  //     timeout: 4000
  //   })
  // }

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

  if (res?.message?.success) {
    res?.message?.success.forEach((successMessage) => {
      toast.success(successMessage, {
        timeout: 4000
      })
    })
  } else if (res?.message) {
    if (Array.isArray(res?.message)) {
      for (let i = 0; i < res?.message.length; i++) {
        toast.success(res?.message[i], {
          timeout: 4000
        })
      }
    } else {
      toast.success(res?.message, {
        timeout: 4000
      })
    }
  } else if (res?.success) {
    if (Array.isArray(res)) {
      res?.success.forEach((successMessage) => {
        toast.success(successMessage, {
          timeout: 4000
        })
      })
    } else {
      toast.success(res?.success, {
        timeout: 4000
      })
    }
  } else if (res) {
    if (Array.isArray(res)) {
      res.forEach((successMessage) => {
        toast.success(successMessage, {
          timeout: 4000
        })
      })
    } else {
      toast.success(res, {
        timeout: 4000
      })
    }
  }
}

export default { catchAxiosError, catchAxiosSuccess }
