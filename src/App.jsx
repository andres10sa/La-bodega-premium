import { useState, useEffect, useCallback, useRef } from "react";
import { Carousel } from "./components/carousel";
import { Contact } from "./components/contact";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { History } from "./components/history";
import { Paralax } from "./components/paralax";
import { Subscription } from "./components/subscription";
import { Testimonials } from "./components/testimonials";
import { Cart } from "./components/cart";
import { Banner } from "./components/banner";

const CART_ITEMS = "car-items";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState({
    isVisible: false,
    product: null,
    count: 0,
  });
  const notificationTimerRef = useRef(null);

  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem(CART_ITEMS);
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem(CART_ITEMS, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    return () => {
      if (notificationTimerRef.current) {
        clearTimeout(notificationTimerRef.current);
      }
    };
  }, []);

  const showNotification = useCallback((product, newQuantity) => {
    if (notificationTimerRef.current) {
      clearTimeout(notificationTimerRef.current);
    }

    setNotification({ isVisible: true, product, count: newQuantity });

    notificationTimerRef.current = setTimeout(() => {
      setNotification((prev) => ({ ...prev, isVisible: false }));
      notificationTimerRef.current = null;
    }, 4000);
  }, []);

  const addToCart = (product) => {
    const existingItemInCurrentState = cartItems.find(
      (item) => item.id === product.id
    );
    const newQuantity = existingItemInCurrentState
      ? existingItemInCurrentState.quantity + 1
      : 1;

    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        );
      } else {
        return [...prevCartItems, { ...product, quantity: newQuantity }];
      }
    });

    showNotification(product, newQuantity);
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const totalItemCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-zinc-800 font-sans">
      <Header toggleCart={toggleCart} itemCount={totalItemCount} />
      <main className="pt-20">
        <Banner />
        <Testimonials />
        <Paralax />
        <Carousel addToCart={addToCart} />
        <History />
        <Subscription />
        <Contact />
        <Footer />
        <Cart
          isVisible={isCartOpen}
          onClose={toggleCart}
          items={cartItems}
          setItems={setCartItems}
        />
        <Notification
          isVisible={notification.isVisible}
          onClose={() => {
            if (notificationTimerRef.current) {
              clearTimeout(notificationTimerRef.current);
              notificationTimerRef.current = null;
            }
            setNotification((prev) => ({ ...prev, isVisible: false }));
          }}
          product={notification.product || { name: "Producto", imageUrl: "" }}
          itemCount={notification.count}
        />
        <a
          href="https://wa.me/573196529174?text=Hola,%20me%20interesan%20sus%20productos."
          target="_blank"
          className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white text-3xl shadow-xl hover:bg-green-600 transition duration-300 z-50"
        >
          <i className="fab fa-whatsapp" aria-hidden="true"></i>
        </a>
      </main>
    </div>
  );
}
export default App;

const Notification = ({ isVisible, onClose, product, itemCount }) => {
  if (!isVisible) return null;

  return (
    <div
      className="fixed top-20 right-4 md:right-6 max-w-xs w-full bg-zinc-900 border border-[#D4B753] 
                 text-white p-4 rounded-xl shadow-2xl z-[9999] 
                 flex items-center space-x-3 transform transition-all duration-300 ease-out animate-fadeIn"
      style={{ animationDuration: "0.4s" }}
      role="alert"
    >
      <i className="fas fa-check-circle text-[#D4B753] text-xl flex-shrink-0"></i>
      <div className="flex-grow min-w-0">
        <p className="font-semibold text-sm">¡Añadido al carrito!</p>
        <p
          className="text-xs text-zinc-400 mt-0.5 truncate w-full"
          title={product.name}
        >
          {product.name} ({itemCount} en total)
        </p>
      </div>
      <button
        onClick={onClose}
        className="text-zinc-500 hover:text-white p-1 rounded-full transition-colors w-4 h-4 flex items-center justify-center flex-shrink-0"
        aria-label="Cerrar notificación"
      >
        <i className="fas fa-times text-sm"></i>
      </button>
    </div>
  );
};
