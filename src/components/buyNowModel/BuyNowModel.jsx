import {
    Button,
    Dialog,
    DialogBody,
} from "@material-tailwind/react";
import { useState } from "react";

const BuyNowModal = ({ addressInfo, setAddressInfo, buyNowFunction }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);
    return (
        <>
            <Button
                type="button"
                onClick={handleOpen}
                className="w-full px-4 py-3 text-center text-gray-100 bg-green-600 border border-transparent dark:border-gray-700 hover:border-gray-500 hover:text-white hover:bg-green-800 rounded-xl"
            >
                Proceed to Checkout
            </Button>
            <Dialog open={open} handler={handleOpen} className=" bg-pink-50 max-w-md mx-auto my-auto">
                <DialogBody className="my-2">
                    <div className="mb-3">
                        <input
                            type="text"
                            name="name"
                            value={addressInfo.name}
                            onChange={(e) => {
                                setAddressInfo({
                                    ...addressInfo,
                                    name: e.target.value
                                })
                            }}
                            placeholder='Enter your name'
                            className='bg-pink-50 border border-gray-300 px-2 py-2 w-full rounded-md outline-none text-black placeholder-gray-400'
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="address"
                            value={addressInfo.address}
                            onChange={(e) => {
                                setAddressInfo({
                                    ...addressInfo,
                                    address: e.target.value
                                })
                            }}
                            placeholder='Enter your address'
                            className='bg-pink-50 border border-gray-300 px-2 py-2 w-full rounded-md outline-none text-black placeholder-gray-400'
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="number"
                            name="pincode"
                            value={addressInfo.pincode}
                            onChange={(e) => {
                                setAddressInfo({
                                    ...addressInfo,
                                    pincode: e.target.value
                                })
                            }}
                            placeholder='Enter your pincode'
                            className='bg-pink-50 border border-gray-300 px-2 py-2 w-full rounded-md outline-none text-black placeholder-gray-400'
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            name="mobileNumber"
                            value={addressInfo.mobileNumber}
                            onChange={(e) => {
                                setAddressInfo({
                                    ...addressInfo,
                                    mobileNumber: e.target.value
                                })
                            }}
                            placeholder='Enter your mobileNumber'
                            className='bg-pink-50 border border-gray-300 px-2 py-2 w-full rounded-md outline-none text-black placeholder-gray-400'
                        />
                    </div>

                    <div className="">
                    <Button
                type="button"
                onClick={() => {
                                handleOpen();
                                buyNowFunction();
                            }}
                className="w-full px-4 py-3 text-center text-gray-100 bg-gray-600 border border-transparent dark:border-gray-700 rounded-lg"
            >
                Buy now
            </Button>
                    </div>

                </DialogBody>
            </Dialog>
        </>
    );
}

export default BuyNowModal;