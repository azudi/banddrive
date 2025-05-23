import React, { useEffect, useRef, useState } from 'react';
import { Menu } from '@mantine/core';
import DotsVerticalIcon from '../svg-icon/DotsVerticalIcon';
import EyeIcon from '../svg-icon/EyeIcon';
import BlacklistUserIcon from '../svg-icon/BlacklistUserIcon';
import SortIcon from '../svg-icon/sortIcon';

import { Users } from '@/services/apiFactory/Users';
import { RootFetchUserInterface, FilterCriteria } from './interface';
import IconFilter from '../svg-icon/IconFilter';
import FilterOptions from './modals/FilterModal';


type State = {
  totalUser: RootFetchUserInterface[];
  filterUser: RootFetchUserInterface[];
  loading: boolean;
  error: any;
};

type Direction = 'asc' | 'desc';

const DashboardTable = () => {
  const [state, setState] = useState<State>({
    totalUser: [],
    filterUser: [],
    loading: false,
    error: null,
  });

  const tableHeaders = [
    { label: 'Organization', key: 'orgName' },
    { label: 'Username', key: 'userName' },
    { label: 'Email', key: 'email' },
    { label: 'Phone number', key: '' },
    { label: 'Date joined', key: '' },
    { label: '', key: '' },
  ]
  const parentRef = useRef<HTMLDivElement>(null);
  const filterOptRef = useRef<any>(null)

  const updateState = (updates: Partial<State>) =>
    setState((prev) => ({ ...prev, ...updates }));

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await Users.$_getUsers();
      const data = response.data.slice(0, 10);
      updateState({ totalUser: data, filterUser: data });
    } catch (error) {
      console.error("Error fetching users:", error);
      updateState({ error });
    }
  };

  const filterUsers = (criteria: FilterCriteria) => {
    const filtered = state.totalUser.filter((user) => {
      return (
          user.orgName.toLowerCase().includes((criteria?.orgName || "").toLowerCase()) &&
           user.userName.toLowerCase().includes((criteria?.userName || "").toLowerCase())
      );
    });

    updateState({ filterUser: filtered });
  };

  const sortUsersBy = (keyPath: string, direction: Direction = 'asc') => {
    const resolveValue = (obj: any, path: string) =>
      path.split('.').reduce((acc, key) => acc?.[key], obj);

    const compare = (
      a: RootFetchUserInterface,
      b: RootFetchUserInterface
    ): number => {
      const aVal = resolveValue(a, keyPath);
      const bVal = resolveValue(b, keyPath);

      const parse = (val: any): any => {
        if (typeof val === 'number') return val;
        if (!isNaN(Number(val))) return Number(val);
        const date = new Date(val);
        return isNaN(date.getTime()) ? val : date;
      };

      const parsedA = parse(aVal);
      const parsedB = parse(bVal);

      if (parsedA < parsedB) return direction === 'asc' ? -1 : 1;
      if (parsedA > parsedB) return direction === 'asc' ? 1 : -1;
      return 0;
    };

    const sorted = [...state.filterUser].sort(compare);
    updateState({ filterUser: sorted });
  };

   const triggerChildFunction = () => {
        if (filterOptRef.current) {
            filterOptRef.current.openModal(); // Call child function using ref
        }
    };

  return (
    <section>
      <FilterOptions ref={filterOptRef} filterUsers={filterUsers}/>
      <div className='pl-3 rounded-md mb-2 bg-banddrivegray-100/50 shadow justify-between flex mt-8 items-center'>
        <span >Users</span>
        <button onClick={()=> triggerChildFunction()} className='flex items-center bg-white py-3 px-3 rounded-tr-md rounded-br-md'>
          <span className='mr-2'><IconFilter width={18} /></span>
          Filters
        </button>
      </div>

      <div className="bg-white rounded-md p-6 mt-2">
        <div className="w-full overflow-x-auto relative" ref={parentRef}>
          <table className="user-table min-w-[992px]" width="100%">
            <thead className="user-table-head">
              <tr>
                {(tableHeaders || []).map(({ label, key }) => (
                  <td key={label}>
                    <span className='flex items-center font-bold'>
                      {label}
                      {key && (
                        <button onClick={() => sortUsersBy(key)} className='ml-1'>
                          <SortIcon width="11" />
                        </button>
                      )}
                    </span>
                  </td>
                ))}
              </tr>
            </thead>
            <tbody className="user-table-body">
              {state.filterUser.map((user) => (
                <tr key={user.email} className="py-3">
                  <td className="pl-1">{user.orgName}</td>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>
                    {user.createdAt
                      .replace('T', ' ')
                      .substring(0, user.createdAt.indexOf('.'))}
                  </td>
                  <td className="pr-2">
                    <Menu shadow="md" width={150} position="left">
                      <Menu.Target>
                        <button className="w-4 h-4 cursor-pointer">
                          <DotsVerticalIcon width="15px" />
                        </button>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item leftSection={<EyeIcon width="15" />}>
                          View Details
                        </Menu.Item>
                        <Menu.Item leftSection={<BlacklistUserIcon width="15" />}>
                          Blacklist User
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default DashboardTable;
