'use client';
import {
  Button,
  Flex,
  HStack,
  Image,
  Link,
  Stack,
  StackProps,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  faArrowRight,
  faArrowUp,
  faCheck,
  faCodeFork,
  faCodePullRequest,
  faEye,
  faMinus,
  faPencil,
  faPlus,
  faQuestion,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { getEvents } from './api/data';
import { Event } from './types/event';
import { RefIcon } from './ui/ref_icon';
import { ToolTipIcon } from './ui/tool_tip_icon';

const LIMIT: number = 30;

export interface RecentActivityProps extends StackProps {
  initialEvents: Event[];
}

export function RecentActivity({
  initialEvents,
  ...props
}: RecentActivityProps) {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const loadMore = async () => {
    const newEvents = await getEvents(events.length, LIMIT);
    setEvents([...events, ...newEvents]);
    setHasMore(newEvents.length === LIMIT);
  };
  const bg = useColorModeValue('gray.50', 'gray.800');

  return (
    <Stack {...props}>
      <Flex zIndex={100} position="sticky" top={0} bg={bg}>
        <Text my={2} fontSize={['lg']} fontWeight="bold">
          Recent Activity
        </Text>
      </Flex>
      <Stack>
        {events.map((event) => {
          const date = new Date(event.created_at).formattedDateTime();
          let icon = faQuestion;
          let tooltip = "I'm not sure what this is...";
          if (event.type === 'PushEvent') {
            icon = faArrowUp;
            tooltip = 'Pushed some code';
          }
          if (event.type === 'WatchEvent') {
            icon = faEye;
            tooltip = 'Watching this repo';
          }
          if (event.type === 'CreateEvent') {
            icon = faPlus;
            tooltip = 'Created a new repo';
          }
          if (event.type === 'PullRequestEvent') {
            icon = faCodePullRequest;
            tooltip = 'Created a pull request';
          }
          if (event.type === 'PullRequestReviewEvent') {
            icon = faCheck;
            tooltip = 'Reviewed a pull request';
          }
          if (event.type === 'IssuesEvent') {
            icon = faPencil;
            tooltip = 'Created an issue';
          }
          if (event.type === 'DeleteEvent') {
            icon = faMinus;
            tooltip = 'Deleted a repo';
          }
          if (event.type === 'ForkEvent') {
            icon = faCodeFork;
            tooltip = 'Forked this repo';
          }
          if (event.type === 'IssueCommentEvent') {
            icon = faPencil;
            tooltip = 'Commented on an issue';
          }

          return (
            <Link
              key={event.id}
              href={`https://github.com/${event.repo.name}`}
              my={[1, 2]}
            >
              <HStack>
                <Image
                  mx={2}
                  borderRadius="full"
                  boxSize="25px"
                  src={event.actor.avatar_url}
                  alt={'avatar'}
                />
                <Flex direction="column">
                  <HStack>
                    <Text fontSize="sm">{event.actor.display_login}</Text>
                    <ToolTipIcon icon={icon} tooltip={tooltip} fontSize="sm" />
                  </HStack>
                  <Text fontSize="xs" color="gray.500">
                    {date}
                  </Text>
                </Flex>
                <RefIcon mx={2} fontSize={['md', 'lg']} icon={faArrowRight} />
                {event.org && (
                  <Image
                    borderRadius="full"
                    boxSize="25px"
                    src={event.org.avatar_url}
                    alt={'avatar'}
                  />
                )}
                <Text fontSize="sm">{event.repo.name}</Text>
              </HStack>
            </Link>
          );
        })}
        {hasMore && (
          <Button my={4} onClick={loadMore}>
            Load more
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
