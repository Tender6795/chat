export const sliceHelper = (builder: any, asyncThunk: any) => {
  return builder
    .addCase(asyncThunk.pending, (state: any) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(asyncThunk.rejected, (state: any, action: any) => {
      state.loading = false;
      state.error = action.error.message || "";
    });
};
