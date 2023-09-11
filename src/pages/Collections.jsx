import React, { useContext, useEffect } from 'react';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject
} from '@syncfusion/ej2-react-grids';

import { Context as CollectionContext } from '../contexts/CategoryContext';
import { Header } from '../components';
import { CONTEXT_MENU_ITEMS, COLLECTIONS_GRID } from '../constants';

const Collections = () => {
  const { collections, getAllCollections } = useContext(CollectionContext);

  useEffect(() => {
    getAllCollections();
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      {' '}
      <Header category="Page" title="Collections" />
      <GridComponent
        id="gridcomp"
        dataSource={collections}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={CONTEXT_MENU_ITEMS}
      >
        <ColumnsDirective>
          {COLLECTIONS_GRID.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[
            Resize,
            Sort,
            ContextMenu,
            Filter,
            Page,
            ExcelExport,
            Edit,
            PdfExport
          ]}
        />
      </GridComponent>
    </div>
  );
};

export default Collections;
