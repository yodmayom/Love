import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu } from 'lucide-react'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activePage, setActivePage] = useState('home')
  const [timeRemainingTop, setTimeRemainingTop] = useState('')
  const [timeRemainingBottom, setTimeRemainingBottom] = useState('')
  const [activePopup, setActivePopup] = useState<'left' | 'right' | null>(null)
  const [buttonPressed, setButtonPressed] = useState<string | null>(null)

  useEffect(() => {
    const topDate = new Date('2025-11-11T00:00:00')
    const bottomDate = new Date('2025-11-25T00:00:00')

    const updateCountdown = () => {
      const now = new Date()
      const diffTop = topDate.getTime() - now.getTime()
      const diffBottom = bottomDate.getTime() - now.getTime()
      setTimeRemainingTop(formatTime(diffTop))
      setTimeRemainingBottom(formatTime(diffBottom))
    }

    const formatTime = (diff: number) => {
      if (diff <= 0) return 'Time Reached'
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((diff / (1000 * 60)) % 60)
      const seconds = Math.floor((diff / 1000) % 60)
      const months = Math.floor(days / 30)
      const remainingDays = days % 30
      return `${months} เดือน ${remainingDays} วัน ${hours} ชั่วโมง ${minutes} นาที ${seconds} วินาที`
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleLeftClick = () => {
    setButtonPressed('left')
    setTimeout(() => setActivePopup('left'), 150)
    setTimeout(() => setButtonPressed(null), 400)
  }

  const handleRightClick = () => {
    setButtonPressed('right')
    setTimeout(() => setActivePopup('right'), 150)
    setTimeout(() => setButtonPressed(null), 400)
  }

  const closePopup = () => setActivePopup(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="w-screen min-h-screen bg-white flex flex-col justify-start items-center overflow-hidden"
    >
      {/* Navbar */}
      <nav className="w-full flex justify-center items-center mb-12 relative">
        <div className="flex items-center justify-between w-full max-w-5xl px-6 py-4 bg-white shadow-md rounded-full">
          <h1 className="text-xl font-bold text-pink-400">For Focus only</h1>

          <div className="hidden md:flex space-x-8 text-gray-600 font-medium">
            <button
              onClick={() => setActivePage('home')}
              className={`hover:text-pink-400 transition ${
                activePage === 'home' ? 'text-pink-500' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActivePage('timeline')}
              className={`hover:text-pink-400 transition ${
                activePage === 'timeline' ? 'text-pink-500' : ''
              }`}
            >
              Timeline
            </button>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-pink-50"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu size={28} className="text-pink-400" />
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-20 w-60 bg-white shadow-lg rounded-xl p-4 flex flex-col space-y-3 text-center md:hidden"
            >
              <button
                onClick={() => {
                  setActivePage('home')
                  setMenuOpen(false)
                }}
                className="text-gray-700 hover:text-pink-400 transition"
              >
                Home
              </button>
              <button
                onClick={() => {
                  setActivePage('timeline')
                  setMenuOpen(false)
                }}
                className="text-gray-700 hover:text-pink-400 transition"
              >
                Timeline
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* หน้า Home */}
      {activePage === 'home' && (
        <section
          id="home"
          className="flex flex-col items-center justify-center mt-10 space-y-8 w-full"
        >
          <h2 className="text-center font-bold text-pink-500 text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight px-4">
            หน้าแห่งความทรงจำของสองเรา 💗
          </h2>

          <div className="flex flex-wrap justify-center gap-12">
            {/* ซ้าย */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-64 h-64 bg-white rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100 overflow-hidden">
                <img
                  src="/images/IMG_2828.PNG"
                  alt="Image 1"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>

              <motion.button
                animate={
                  buttonPressed === 'left'
                    ? { scale: [1, 0.85, 1.15, 1] }
                    : { scale: 1 }
                }
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                whileHover={{ scale: 1.1 }}
                className="px-8 py-3 bg-pink-200 text-gray-700 font-medium rounded-full shadow-md hover:shadow-xl transition"
                onClick={handleLeftClick}
              >
                ลองกดดูสิ 💌
              </motion.button>
            </div>

            {/* ขวา */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-64 h-64 bg-white rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100 overflow-hidden">
                <img
                  src="/images/IMG_2829.PNG"
                  alt="Image 2"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>

              <motion.button
                animate={
                  buttonPressed === 'right'
                    ? { scale: [1, 0.85, 1.15, 1] }
                    : { scale: 1 }
                }
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                whileHover={{ scale: 1.1 }}
                className="px-8 py-3 bg-pink-200 text-gray-700 font-medium rounded-full shadow-md hover:shadow-xl transition"
                onClick={handleRightClick}
              >
                ลองกดดูสิ 💌
              </motion.button>
            </div>
          </div>
        </section>
      )}

      {/* หน้า Timeline */}
      {activePage === 'timeline' && (
        <section
          id="timeline"
          className="flex flex-col items-center space-y-16 mt-16 w-full max-w-4xl"
        >
          <div className="bg-pink-100 shadow-lg rounded-2xl p-8 w-full text-center">
            <h2 className="text-4xl font-bold text-pink-500 mb-4">วันครบรอบ</h2>
            <p className="text-2xl text-gray-700 font-semibold">
              เหลือเวลาอีก {timeRemainingTop}
            </p>
          </div>

          <div className="bg-pink-50 shadow-md rounded-xl p-6 w-full text-center">
            <h3 className="text-2xl font-semibold text-pink-400 mb-2">
              วันเกิดโฟกัส
            </h3>
            <p className="text-lg text-gray-600">
              เหลือเวลาอีก {timeRemainingBottom}
            </p>
          </div>
        </section>
      )}

      {/* Popup - ซ้าย */}
      <AnimatePresence>
        {activePopup === 'left' && (
          <motion.div
            key="popup-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
            onClick={closePopup}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 40 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-[90vw] max-h-[80vh] overflow-auto flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full md:w-1/2 flex justify-center">
                <img
                  src="/images/IMG_2828.PNG"
                  alt="Popup Left"
                  className="w-full h-auto rounded-2xl object-cover max-h-[50vh]"
                />
              </div>

              <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
                <h2 className="text-2xl font-semibold text-pink-400">
                  ครั้งแรกที่เจอกัน 💌
                </h2>
                <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                  ตอนแรกหนูฟอลพี่มาพี่ไม่รู้เลยว่าหนูคือใคร และพี่ก็ไม่ได้สนใจอะไรด้วย
                  แต่ด้วยความที่พี่ชอบส่องคนที่ฟอลมาพี่ดันไปส่องไฮไลท์ของหนูซึ่งแวบแรกที่พี่เห็นเชี่ยยย
                  คนอะไรน่ารักจัง แบบพี่ก็อาจจะเริ่มมีใจตั้งแต่ตอนนั้นแต่ตอนนั้นตัวเองไม่ยอมรับว่าชอบหนู
                  แต่ในใจอยากทักมากอยากคุยสุดๆ แล้ววันนั้นก็มาถึง พี่ก็ทักหนูไปด้วยการรีไพร์สตอรี่
                  ซึ่งพี่ทำใจนานมากกว่าจะทักได้ แต่พอพี่ได้คุยแล้วหนูน่ารักมากกกกกก
                  ในใจพี่ตอนนั้นนี่แหละสเปคที่ชอบเลย 💖
                </p>
                <button
                  onClick={closePopup}
                  className="px-6 py-2 bg-pink-200 rounded-full shadow-md hover:shadow-lg transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popup - ขวา */}
      <AnimatePresence>
        {activePopup === 'right' && (
          <motion.div
            key="popup-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
            onClick={closePopup}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 40 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-[90vw] max-h-[80vh] overflow-auto flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full md:w-1/2 flex justify-center">
                <img
                  src="/images/IMG_2829.PNG"
                  alt="Popup Right"
                  className="w-full h-auto rounded-2xl object-cover max-h-[50vh]"
                />
              </div>

              <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
                <h2 className="text-2xl font-semibold text-pink-400">
                  วันเกิดพี่ที่มีหนูด้วย 🎂
                </h2>
                <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                  ตอนถึงวันเกิดพี่ทั้งชีวิตมาพี่ไม่เคยมีใครมาถือเค้กเซอร์ไพรส์เลยทั้งชีวิต
                  พี่ไม่คิดด้วยว่าหนูจะซื้อของให้ ซึ่งหนูซื้อของแพงให้พี่ด้วย แค่มีเค้กพี่ก็ดีใจมากแล้ว
                  อันนี้มีของด้วย 🥺 หนูเป็นคนแรกเลยนอกจากครอบครัวของเค้าที่มาแฮปปี้เบิร์ธเดย์เค้า
                  หืออ รักแฟนจังเลย ❤️ พี่ดีใจมากเลยนะ ขอบคุณที่เข้ามาทำให้ชีวิตของพี่สดใสขึ้นนะคะ
                </p>
                <button
                  onClick={closePopup}
                  className="px-6 py-2 bg-pink-200 rounded-full shadow-md hover:shadow-lg transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
