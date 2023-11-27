export const handleSnackbarClose = (setOpenSnackbar, event, reason) => {
    console.log(event, reason)
    if (reason === 'clickaway') {
        return;
    }
    setOpenSnackbar(false);
}