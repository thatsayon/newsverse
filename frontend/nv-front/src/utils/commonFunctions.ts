import toast from "react-hot-toast";


export const errorToast = (msg: string) => {
    toast.error(msg, {
        style: {
            border: '1px solid #d7f64e',
            padding: '16px',
            color: '#d7f64e',
            backgroundColor: '#222222',
        },
        iconTheme: {
            primary: '#d7f64e',
            secondary: '#222222',
        },
    });
}

export const successToast = (msg: string) => {
    toast.success(msg,
        {
          style: {
            border: '1px solid #d7f64e',
            padding: '16px',
            color: '#d7f64e',
            backgroundColor: '#222222',
          },
          iconTheme: {
            primary: '#d7f64e',
            secondary: '#222222',
          },
        }
      );
}