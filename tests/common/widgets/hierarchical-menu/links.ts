import {
  createSearchClient,
  createMultiSearchResponse,
  createSingleSearchResponse,
} from '@instantsearch/mocks';
import { wait } from '@instantsearch/testutils';
import userEvent from '@testing-library/user-event';

import type { HierarchicalMenuWidgetSetup } from '.';
import type { TestOptions } from '../../common';

export function createLinksTests(
  setup: HierarchicalMenuWidgetSetup,
  { act }: Required<TestOptions>
) {
  describe('links', () => {
    test("a click on a link with modifier doesn't search", async () => {
      const delay = 100;
      const margin = 10;
      const attributes = ['1', '2'];
      const options = {
        instantSearchOptions: {
          indexName: 'indexName',
          initialUiState: {
            indexName: {
              hierarchicalMenu: {
                [attributes[0]]: ['Apple > iPhone'],
              },
            },
          },
          searchClient: createSearchClient({
            search: jest.fn(async (requests) => {
              await wait(delay);
              return createMultiSearchResponse(
                ...requests.map(() =>
                  createSingleSearchResponse({
                    facets: {
                      [attributes[0]]: {
                        Samsung: 100,
                        Apple: 200,
                      },
                      [attributes[1]]: {
                        'Apple > iPad': 100,
                        'Apple > iPhone': 100,
                      },
                    },
                  })
                )
              );
            }),
          }),
        },
        widgetParams: { attributes },
      };

      await setup(options);

      // Wait for initial results to populate widgets with data
      await act(async () => {
        await wait(margin + delay);
        await wait(0);
      });

      const container = document.querySelector('.ais-HierarchicalMenu')!;

      // Initial state, before interaction
      {
        expect(container.querySelectorAll('a')).toHaveLength(4);
        expect(
          options.instantSearchOptions.searchClient.search
        ).toHaveBeenCalledTimes(1);
      }

      // Click all links with a modifier
      {
        await act(async () => {
          container.querySelectorAll('a').forEach((link) => {
            userEvent.click(link, { ctrlKey: true });
          });

          await wait(0);
          await wait(0);
        });

        // No UI has changed
        expect(container.querySelectorAll('a')).toHaveLength(4);
        expect(
          options.instantSearchOptions.searchClient.search
        ).toHaveBeenCalledTimes(1);
      }

      // Wait for new results to come in
      {
        await act(async () => {
          await wait(delay + margin);
        });

        expect(container.querySelectorAll('a')).toHaveLength(4);
        expect(
          options.instantSearchOptions.searchClient.search
        ).toHaveBeenCalledTimes(1);
      }
    });
  });
}