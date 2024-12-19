import React from 'react'

function Header() {
    return (
        <>
        <div className='mx-52'>
            <div className='display flex mt-5 justify-between mt-16'>
                <div className='mt-3 border-t-2 border-black'>
                    <h1 className='text-xl font-bold tracking-widest'>TP2</h1>
                </div>
                <div className='justify-center  space-x-12 items-center'>
                    <button className='bg-black rounded-sm text-white p-3 rounded-md'>Sing up</button>
                    <button className='bg-gradient-to-r from-orange-500 to-red-600 text-white p-3 rounded-md'>Login</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Header
