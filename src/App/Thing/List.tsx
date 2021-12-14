import React from 'react'
import styled from 'styled-components'
import { types } from '../../API/resource/thing'
import { timeAgo } from '../../utilities'
import { Store } from '../Store/types'

export type ListProps = React.HTMLProps<HTMLUListElement> & {
  store: Store
  things?: types.QueryResponse['data']
}

/**
 * List of things.
 */
export const List = styled(({ store, things, ...props }: ListProps) => (
  <ul { ...props }>
    {things?.map(thing => (
      <li key={thing.id}>
        <aside>
          <time title={new Date(thing.createdAt).toLocaleString()}>
            {timeAgo(thing.createdAt)}
          </time>
        </aside>

        <div>
          {thing.description}
        </div>
      </li>
    ))}
  </ul>
))`
  width: 400px;
  max-width: 100%;
  border: 0;
  margin: 0 auto;
  padding: 0;

  > li {
    list-style-type: none;
    padding: 30px 15px;
    font-size: 15px;
    line-height: 20px;

    > aside {
      float: right;
      padding-left: 10px;
      line-height: 1;
      white-space: nowrap;

      > time {
        margin-left: 5px;
        color: ${({ theme }) => theme.colors.grayText};
        font-size: 10px;
        text-transform: uppercase;
      }
    }

    > div {
      white-space: pre-line;
    }

    > footer {
      margin-top: 10px;
    }
  }
`
