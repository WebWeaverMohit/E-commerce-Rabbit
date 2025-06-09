import React, { useRef, useState, useEffect } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const NewArrivals = () => {
    const ScrollRef = useRef(null)

    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(null)
    const [scrollLeft, setScrollLeft] = useState(0)
    const [mouseDown, setMouseDown] = useState(false)

    const dragThreshold = 5 // drag start होने के लिए min distance

    const newArrivals = [
        {
            _id: "1",
            name: "Stylish Jacket",
            price: 120,
            images: [
                {
                    url: "https://picsum.photos/seed/1/500/500.jpg",
                    altText: "Stylish Jacket 1"
                }
            ]
        },
        {
            _id: "2",
            name: "Stylish Jacket",
            price: 120,
            images: [
                {
                    url: "https://picsum.photos/seed/2/500/500.jpg",
                    altText: "Stylish Jacket 2"
                }
            ]
        },
        {
            _id: "3",
            name: "Stylish Jacket",
            price: 120,
            images: [
                {
                    url: "https://picsum.photos/seed/3/500/500.jpg",
                    altText: "Stylish Jacket 3"
                }
            ]
        },
        {
            _id: "4",
            name: "Stylish Jacket",
            price: 120,
            images: [
                {
                    url: "https://picsum.photos/seed/4/500/500.jpg",
                    altText: "Stylish Jacket 4"
                }
            ]
        },
        {
            _id: "5",
            name: "Stylish Jacket",
            price: 120,
            images: [
                {
                    url: "https://picsum.photos/seed/5/500/500.jpg",
                    altText: "Stylish Jacket 5"
                }
            ]
        },
        {
            _id: "6",
            name: "Stylish Jacket",
            price: 120,
            images: [
                {
                    url: "https://picsum.photos/seed/6/500/500.jpg",
                    altText: "Stylish Jacket 6"
                }
            ]
        },
        {
            _id: "7",
            name: "Stylish Jacket",
            price: 120,
            images: [
                {
                    url: "https://picsum.photos/seed/7/500/500.jpg",
                    altText: "Stylish Jacket 7"
                }
            ]
        },
        {
            _id: "8",
            name: "Stylish Jacket",
            price: 120,
            images: [
                {
                    url: "https://picsum.photos/seed/8/500/500.jpg",
                    altText: "Stylish Jacket 8"
                }
            ]
        }
    ];


    const handleMouseDown = (e) => {
        setMouseDown(true)
        setIsDragging(false)
        setStartX(e.pageX - ScrollRef.current.offsetLeft)
        setScrollLeft(ScrollRef.current.scrollLeft)
    }

    const handleMouseMove = (e) => {
        if (!mouseDown) return

        const x = e.pageX - ScrollRef.current.offsetLeft
        const walk = x - startX

        if (!isDragging && Math.abs(walk) > dragThreshold) {
            setIsDragging(true)
        }

        if (!isDragging) return

        e.preventDefault()
        ScrollRef.current.scrollLeft = scrollLeft - walk
    }

    const handleMouseUpOrLeave = () => {
        setMouseDown(false)
        setIsDragging(false)
        setStartX(null)
    }

    const checkScroll = () => {
        const el = ScrollRef.current
        if (!el) return

        setCanScrollLeft(el.scrollLeft > 0)
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth)
    }

    const scrollLeftFn = () => {
        if (!ScrollRef.current) return
        ScrollRef.current.scrollBy({ left: -ScrollRef.current.clientWidth / 2, behavior: 'smooth' })
    }

    const scrollRightFn = () => {
        if (!ScrollRef.current) return
        ScrollRef.current.scrollBy({ left: ScrollRef.current.clientWidth / 2, behavior: 'smooth' })
    }

    useEffect(() => {
        checkScroll()
        const el = ScrollRef.current
        if (!el) return

        el.addEventListener('scroll', checkScroll)
        return () => el.removeEventListener('scroll', checkScroll)
    }, [])

    return (
        <div className='px-10 py-12'>
            <div className='mx-auto text-center mb-10 relative'>
                <h2 className='text-3xl font-bold mb-4'>Explore New Arrivals</h2>
                <p className='text-lg text-gray-600 mb-8'>
                    Discover the latest styles straight off the runway, freshly added to keep your wardrobe on the cutting edge of fashion.
                </p>
                <div className='absolute right-0 bottom-[-30px] flex space-x-2'>
                    <button
                        onClick={scrollLeftFn}
                        disabled={!canScrollLeft}
                        className='p-2 rounded border bg-white text-black hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        <FiChevronLeft className='text-2xl' />
                    </button>
                    <button
                        onClick={scrollRightFn}
                        disabled={!canScrollRight}
                        className='p-2 rounded border bg-white text-black hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        <FiChevronRight className='text-2xl' />
                    </button>
                </div>
            </div>

            <div
                ref={ScrollRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
                className={`w-full overflow-x-auto select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
                {/* Hide scrollbar for Chrome, Safari and Opera */}
                <style>
                    {`
            div::-webkit-scrollbar {
              display: none;
            }
          `}
                </style>

                <div
                    className='flex gap-6 px-4 sm:px-8 lg:px-12 w-max'
                    style={{ pointerEvents: isDragging ? 'none' : 'auto' }} // **यहां है main बदलाव**
                >
                    {newArrivals.map((product) => (
                        <div
                            key={product._id}
                            className='min-w-[250px] sm:min-w-[300px] lg:min-w-[320px] relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition'
                        >
                            <img
                                src={product.images[0].url}
                                alt={product.images[0].altText || product.name}
                                className='w-full h-90 object-cover'
                                draggable={false} // image drag disable करना अच्छा रहता है
                            />
                            <div className='absolute bottom-0 left-0 right-0 bg-transparent/40 backdrop-blur-sm text-white p-4'>
                                <Link to={`/product/${product._id}`} className='block hover:underline'>
                                    <h4 className='font-semibold text-lg'>{product.name}</h4>
                                </Link>
                                <p className='mt-1 text-sm'>${product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default NewArrivals
