import { createSlice } from "@reduxjs/toolkit";
import { dummyBookingData } from "../../constants/dummy";
function getInitData() {
	const savedData = localStorage.getItem('booking');
	return savedData ? JSON.parse(savedData) : dummyBookingData;
}
const bookingSlice = createSlice({
	name: "booking",
	initialState: {
		booking: getInitData()
	},
	reducers: {
		setBooking: (state, action) => {
			state.booking = action.payload
			localStorage.setItem('booking', JSON.stringify(action.payload))
		},
	}
})

export const { setBooking } = bookingSlice.actions;
export default bookingSlice.reducer