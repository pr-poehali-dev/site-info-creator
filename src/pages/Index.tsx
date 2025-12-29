import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: Subcategory[];
}

interface Subcategory {
  id: string;
  name: string;
  items: InfoItem[];
}

interface InfoItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

const mockData: Category[] = [
  {
    id: 'cat1',
    name: 'Технологии',
    icon: 'Cpu',
    subcategories: [
      {
        id: 'sub1',
        name: 'Программирование',
        items: [
          {
            id: 'item1',
            title: 'React и TypeScript',
            description: 'Современная разработка пользовательских интерфейсов с использованием React и строгой типизации TypeScript для создания масштабируемых приложений.',
            tags: ['Frontend', 'JavaScript', 'UI/UX']
          },
          {
            id: 'item2',
            title: 'Python для Data Science',
            description: 'Анализ данных, машинное обучение и визуализация с помощью библиотек NumPy, Pandas, Matplotlib и scikit-learn.',
            tags: ['Python', 'ML', 'Data']
          }
        ]
      },
      {
        id: 'sub2',
        name: 'Инфраструктура',
        items: [
          {
            id: 'item3',
            title: 'Облачные технологии',
            description: 'Развертывание и управление приложениями в облачных платформах AWS, Azure и Google Cloud с использованием контейнеризации.',
            tags: ['Cloud', 'DevOps', 'Docker']
          }
        ]
      }
    ]
  },
  {
    id: 'cat2',
    name: 'Дизайн',
    icon: 'Palette',
    subcategories: [
      {
        id: 'sub3',
        name: 'UI/UX дизайн',
        items: [
          {
            id: 'item4',
            title: 'Принципы минимализма',
            description: 'Создание чистых интерфейсов с максимальным вниманием к деталям, типографике и пространству. Меньше элементов — больше смысла.',
            tags: ['Минимализм', 'Типографика', 'Композиция']
          },
          {
            id: 'item5',
            title: 'Цветовая теория',
            description: 'Психология цвета, построение палитр и создание гармоничных визуальных решений для различных типов интерфейсов.',
            tags: ['Цвет', 'Палитры', 'Психология']
          }
        ]
      }
    ]
  },
  {
    id: 'cat3',
    name: 'Маркетинг',
    icon: 'TrendingUp',
    subcategories: [
      {
        id: 'sub4',
        name: 'Digital Marketing',
        items: [
          {
            id: 'item6',
            title: 'SEO оптимизация',
            description: 'Методы продвижения сайтов в поисковых системах: подбор ключевых слов, оптимизация контента, техническое SEO.',
            tags: ['SEO', 'Google', 'Трафик']
          }
        ]
      }
    ]
  }
];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(mockData[0].id);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(mockData[0].subcategories[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  const currentCategory = mockData.find(cat => cat.id === selectedCategory);
  const currentSubcategory = currentCategory?.subcategories.find(sub => sub.id === selectedSubcategory);

  const filteredItems = currentSubcategory?.items.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <header className="mb-12 text-center animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 text-foreground tracking-tight">
            База знаний
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Организованная информация по категориям и подразделам для быстрого доступа
          </p>
        </header>

        <div className="mb-8 max-w-xl mx-auto">
          <div className="relative">
            <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="text"
              placeholder="Поиск по заголовкам, описаниям и тегам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3 space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4 px-3">
              Категории
            </h3>
            <ScrollArea className="h-[calc(100vh-20rem)]">
              {mockData.map(category => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setSelectedSubcategory(category.subcategories[0]?.id || null);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 mb-1 group ${
                    selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'hover:bg-secondary text-foreground'
                  }`}
                >
                  <Icon
                    name={category.icon}
                    size={20}
                    className={selectedCategory === category.id ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'}
                  />
                  <span className="font-medium">{category.name}</span>
                </button>
              ))}
            </ScrollArea>
          </aside>

          <main className="lg:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <nav className="md:col-span-1 space-y-1">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4 px-3">
                  Подразделы
                </h3>
                {currentCategory?.subcategories.map(subcategory => (
                  <button
                    key={subcategory.id}
                    onClick={() => setSelectedSubcategory(subcategory.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 text-sm ${
                      selectedSubcategory === subcategory.id
                        ? 'bg-accent text-accent-foreground font-medium'
                        : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {subcategory.name}
                  </button>
                ))}
              </nav>

              <div className="md:col-span-3 space-y-6">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, index) => (
                    <Card
                      key={item.id}
                      className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in border-border"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardContent className="p-6">
                        <h4 className="text-xl font-semibold mb-3 text-foreground">
                          {item.title}
                        </h4>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {item.description}
                        </p>
                        <Separator className="my-4" />
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map(tag => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs font-medium"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-16">
                    <Icon name="SearchX" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground text-lg">
                      Ничего не найдено по запросу "{searchQuery}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
