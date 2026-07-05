import { useNavigate } from 'react-router'
import { useLang } from '../hooks/useLang'
import { products } from '../data/products'
import type { Product } from '../data/products'

interface Props {
  currentProduct: Product
}

export default function RelatedProducts({ currentProduct }: Props) {
  const { lang } = useLang()
  const navigate = useNavigate()
  const isBg = lang === 'bg'

  // Get related products (same category, different product)
  const related = products
    .filter(p => p.id !== currentProduct.id && (p.category === currentProduct.category || p.filters?.some(f => currentProduct.filters?.includes(f))))
    .slice(0, 3)

  if (related.length === 0) return null

  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 border-t border-white/[0.04]">
      <h2 className="text-[13px] font-bold tracking-[0.1em] text-[var(--accent)] uppercase mb-8">
        {isBg ? 'Сходни модели' : 'Related Models'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {related.map(product => (
          <div
            key={product.id}
            onClick={() => navigate(`/product/${product.slug}`)}
            className="group cursor-pointer bg-[#1a1a1a] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/10 transition-all"
          >
            <div className="aspect-square bg-[#141414] p-4 overflow-hidden">
              <img
                src={product.image}
                alt={product.alt}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="p-5">
              <span className="text-[10px] font-semibold tracking-[0.15em] text-white/20 uppercase">{product.category}</span>
              <h3 className="text-[14px] font-semibold text-white mt-1 group-hover:text-[var(--accent)] transition-colors">
                {isBg ? product.nameBg : product.name}
              </h3>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-[16px] font-bold text-white">{product.price}</span>
                <span className="text-[12px] text-white/20">{product.priceBgn}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
