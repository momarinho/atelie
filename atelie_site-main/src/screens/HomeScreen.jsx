import React, { useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import AllPosts from '../components/AllPosts';
import Emphasis from '../components/Emphasis';
import Loading from '../components/Loading';
import Posts from '../hooks/posts';
import Table from '../components/Table';
import Contact from '../screens/Contact';

const HomeScreen = () => {
  const { posts, isLoading } = Posts();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      {/* Recent Posts section */}
      <section className="bg-gray-100 py-12">
        <h1 className="flex ml-6 text-xl font-bold text-gray-500">Destaques</h1>
        <div className="container mx-auto px-4">
          {isLoading ? <Loading /> : <Emphasis posts={posts} />}
        </div>
      </section>

      <Tabs selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)}>
        <TabList>
          <Tab>Todos os Produtos</Tab>
          <Tab>Tabela</Tab>
          <Tab>Contato</Tab>
        </TabList>
        <TabPanel>
          <section className="py-12">
            <div className="container mx-auto px-4">
              {isLoading ? <Loading /> : <AllPosts posts={posts} />}
            </div>
          </section>
        </TabPanel>
        <TabPanel>
          <section className="py-12">
            <div className="container mx-auto px-4">
              {isLoading ? <Loading /> : <Table />}
            </div>
          </section>
        </TabPanel>
        <TabPanel>
          <section className="py-12">
            <div className="container mx-auto px-4">
              {isLoading ? <Loading /> : <Contact />}
            </div>
          </section>
        </TabPanel>
      </Tabs>
    </>
  );
};

export default HomeScreen;
