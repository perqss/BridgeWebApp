export const handleSnackbarClose = (setOpenSnackbar, event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setOpenSnackbar(false);
}