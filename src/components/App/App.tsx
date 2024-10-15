import { ConfigProvider, Input, Pagination, Tabs } from 'antd'

import { MoviesList } from '../MoviesList/MoviesList'

import './app/app.sass'

const App = () => {
  return (
    <div className="app">
      <Tabs
        centered
        items={[
          {
            label: 'Search',
            key: '1',
            children: (
              <>
                <Input placeholder="Type to search..." />
                <MoviesList />
                <ConfigProvider
                  theme={{
                    components: {
                      Pagination: {
                        itemActiveBg: '#1890FF',
                        colorPrimary: 'white',
                        colorPrimaryHover: 'whire',
                      },
                    },
                  }}
                >
                  <Pagination align="center" defaultCurrent={1} pageSize={20} total={6000} showSizeChanger={false} />
                </ConfigProvider>
              </>
            ),
          },
          { label: 'Rated', key: '2' },
        ]}
      />
    </div>
  )
}

export default App
