import { Category } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CategoryFilterProps {
  categories: Category[]
  activeCategory: string | null
  onCategoryChange: (slug: string | null) => void
}

export function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
      <Button
        variant={activeCategory === null ? 'default' : 'outline'}
        onClick={() => onCategoryChange(null)}
        className="rounded-full text-sm px-4 sm:px-6 h-9 sm:h-10 min-h-[44px]"
        style={{ backgroundColor: activeCategory === null ? '#006994' : undefined, color: activeCategory === null ? '#ffffff' : undefined }}
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.slug ? 'default' : 'outline'}
          onClick={() => onCategoryChange(category.slug)}
          className="rounded-full text-sm px-4 sm:px-6 h-9 sm:h-10 min-h-[44px]"
          style={{ backgroundColor: activeCategory === category.slug ? '#006994' : undefined, color: activeCategory === category.slug ? '#ffffff' : undefined }}
        >
          {category.name}
        </Button>
      ))}
    </div>
  )
}
