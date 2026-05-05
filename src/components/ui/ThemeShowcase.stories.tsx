import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import { Button } from './buttons/Button';
import { Input } from './inputs/Input';
import { Badge } from './Badge';
import { Avatar } from './Avatar';
import { Modal } from './Modal';
import { Progress } from './Progress';
import { Spinner } from './Spinner';
import { Tabs } from './Tabs';
import { Accordion } from './Accordion';
import { Tooltip } from './Tooltip';
import { Dropdown, DropdownItem, DropdownTrigger } from './Dropdown';
import { Divider } from './Divider';
import { Grid } from './Grid/Grid';
import { GridItem } from './Grid/GridItem';
import { Size } from '../../types/sizes';
import { ButtonVariant, BadgeVariant } from '../../types/ui';
import { DOC_THEME_SHOWCASE } from '@/components/ui/storyDocs/uiKitDocs';
import { themeShowcaseStoriesStyles } from './ThemeShowcase.stories.styles';

const meta: Meta = {
  title: 'UI Kit/Utils/Theme Showcase',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: DOC_THEME_SHOWCASE,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const LightTheme: Story = {
  render: () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [progressValue, _setProgressValue] = useState(65);

    return (
      <div style={themeShowcaseStoriesStyles.lightPageShell}>
        <div style={themeShowcaseStoriesStyles.contentShell}>
          <h1 style={themeShowcaseStoriesStyles.pageHeading}>UI Components - Light Theme</h1>

          <Grid columns={2} gap={Size.MD}>
            {/* Buttons */}
            <GridItem>
              <Card>
                <CardHeader>
                  <CardTitle>Buttons</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={themeShowcaseStoriesStyles.buttonRow}>
                    <Button variant={ButtonVariant.PRIMARY}>Primary</Button>
                    <Button variant={ButtonVariant.SECONDARY}>Secondary</Button>
                    <Button variant={ButtonVariant.OUTLINE}>Outline</Button>
                    <Button variant={ButtonVariant.GHOST}>Ghost</Button>
                    <Button variant={ButtonVariant.DANGER}>Danger</Button>
                    <Button variant={ButtonVariant.SUCCESS}>Success</Button>
                    <Button disabled>Disabled</Button>
                    <Button loading>Loading</Button>
                  </div>
                </CardContent>
              </Card>
            </GridItem>

            {/* Inputs */}
            <GridItem>
              <Card>
                <CardHeader>
                  <CardTitle>Inputs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={themeShowcaseStoriesStyles.verticalStackGap16}>
                    <Input
                      label="Default Input"
                      placeholder="Enter text..."
                      value={inputValue}
                      onChange={(changeEvent) => setInputValue(changeEvent.target.value)}
                    />
                    <Input
                      label="Input with Error"
                      placeholder="Error input"
                      error="This field is required"
                    />
                    <Input label="Input with Success" placeholder="Success input" success />
                    <Input label="Disabled Input" placeholder="Disabled" disabled />
                  </div>
                </CardContent>
              </Card>
            </GridItem>

            {/* Badges and Avatars */}
            <GridItem>
              <Card>
                <CardHeader>
                  <CardTitle>Badges & Avatars</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={themeShowcaseStoriesStyles.badgeAvatarRow}>
                    <Badge variant={BadgeVariant.PRIMARY}>Default</Badge>
                    <Badge variant={BadgeVariant.SECONDARY}>Secondary</Badge>
                    <Badge variant={BadgeVariant.DANGER}>Destructive</Badge>
                    <Badge variant={BadgeVariant.OUTLINE}>Outline</Badge>
                    <Avatar size={Size.SM} src="https://i.pravatar.cc/150?img=1" />
                    <Avatar size={Size.MD} src="https://i.pravatar.cc/150?img=2" />
                    <Avatar size={Size.LG} src="https://i.pravatar.cc/150?img=3" />
                  </div>
                </CardContent>
              </Card>
            </GridItem>

            {/* Progress and Spinner */}
            <GridItem>
              <Card>
                <CardHeader>
                  <CardTitle>Progress & Spinner</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={themeShowcaseStoriesStyles.verticalStackGap16}>
                    <Progress value={progressValue} />
                    <div style={themeShowcaseStoriesStyles.horizontalGap16Center}>
                      <Spinner size={Size.SM} />
                      <Spinner size={Size.MD} />
                      <Spinner size={Size.LG} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </GridItem>

            {/* Tabs */}
            <GridItem>
              <Card>
                <CardHeader>
                  <CardTitle>Tabs</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultActiveTab="tab1">
                    <div>Tab content would go here</div>
                  </Tabs>
                </CardContent>
              </Card>
            </GridItem>

            {/* Accordion */}
            <GridItem>
              <Card>
                <CardHeader>
                  <CardTitle>Accordion</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion>
                    <div>Accordion content would go here</div>
                  </Accordion>
                </CardContent>
              </Card>
            </GridItem>

            {/* Tooltip and Dropdown */}
            <GridItem>
              <Card>
                <CardHeader>
                  <CardTitle>Tooltip & Dropdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={themeShowcaseStoriesStyles.horizontalGap16Center}>
                    <Tooltip content="This is a tooltip">
                      <Button>Hover for tooltip</Button>
                    </Tooltip>
                    <Dropdown
                      trigger={
                        <DropdownTrigger>
                          <Button variant={ButtonVariant.OUTLINE}>Dropdown</Button>
                        </DropdownTrigger>
                      }
                    >
                      <DropdownItem>Item 1</DropdownItem>
                      <DropdownItem>Item 2</DropdownItem>
                      <DropdownItem>Item 3</DropdownItem>
                    </Dropdown>
                  </div>
                </CardContent>
              </Card>
            </GridItem>

            {/* Divider */}
            <GridItem>
              <Card>
                <CardHeader>
                  <CardTitle>Divider</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={themeShowcaseStoriesStyles.verticalStackGap16}>
                    <p>Content above divider</p>
                    <Divider />
                    <p>Content below divider</p>
                  </div>
                </CardContent>
              </Card>
            </GridItem>
          </Grid>

          {/* Modal */}
          <div style={themeShowcaseStoriesStyles.modalOpenSection}>
            <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          </div>

          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Demo Modal">
            <p>This is a modal content. All components should respect the current theme.</p>
            <div style={themeShowcaseStoriesStyles.modalActionsRow}>
              <Button variant={ButtonVariant.SECONDARY} onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setModalOpen(false)}>Confirm</Button>
            </div>
          </Modal>
        </div>
      </div>
    );
  },
};

export const DarkTheme: Story = {
  render: () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [progressValue, _setProgressValue] = useState(65);

    return (
      <div style={themeShowcaseStoriesStyles.darkPageShell}>
        <div style={themeShowcaseStoriesStyles.contentShell}>
          <h1 style={themeShowcaseStoriesStyles.pageHeadingOnDark}>UI Components - Dark Theme</h1>

          <Grid columns={2} gap={Size.MD}>
            {/* Buttons */}
            <GridItem>
              <Card>
                <CardHeader>
                  <CardTitle>Buttons</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={themeShowcaseStoriesStyles.buttonRow}>
                    <Button variant={ButtonVariant.PRIMARY}>Primary</Button>
                    <Button variant={ButtonVariant.SECONDARY}>Secondary</Button>
                    <Button variant={ButtonVariant.OUTLINE}>Outline</Button>
                    <Button variant={ButtonVariant.GHOST}>Ghost</Button>
                    <Button variant={ButtonVariant.DANGER}>Danger</Button>
                    <Button variant={ButtonVariant.SUCCESS}>Success</Button>
                    <Button disabled>Disabled</Button>
                    <Button loading>Loading</Button>
                  </div>
                </CardContent>
              </Card>
            </GridItem>

            {/* Inputs */}
            <GridItem>
              <Card>
                <CardHeader>
                  <CardTitle>Inputs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={themeShowcaseStoriesStyles.verticalStackGap16}>
                    <Input
                      label="Default Input"
                      placeholder="Enter text..."
                      value={inputValue}
                      onChange={(changeEvent) => setInputValue(changeEvent.target.value)}
                    />
                    <Input
                      label="Input with Error"
                      placeholder="Error input"
                      error="This field is required"
                    />
                    <Input label="Input with Success" placeholder="Success input" success />
                    <Input label="Disabled Input" placeholder="Disabled" disabled />
                  </div>
                </CardContent>
              </Card>
            </GridItem>

            {/* Badges and Avatars */}
            <GridItem>
              <Card>
                <CardHeader>
                  <CardTitle>Badges & Avatars</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={themeShowcaseStoriesStyles.badgeAvatarRow}>
                    <Badge variant={BadgeVariant.PRIMARY}>Default</Badge>
                    <Badge variant={BadgeVariant.SECONDARY}>Secondary</Badge>
                    <Badge variant={BadgeVariant.DANGER}>Destructive</Badge>
                    <Badge variant={BadgeVariant.OUTLINE}>Outline</Badge>
                    <Avatar size={Size.SM} src="https://i.pravatar.cc/150?img=1" />
                    <Avatar size={Size.MD} src="https://i.pravatar.cc/150?img=2" />
                    <Avatar size={Size.LG} src="https://i.pravatar.cc/150?img=3" />
                  </div>
                </CardContent>
              </Card>
            </GridItem>

            {/* Progress and Spinner */}
            <GridItem>
              <Card>
                <CardHeader>
                  <CardTitle>Progress & Spinner</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={themeShowcaseStoriesStyles.verticalStackGap16}>
                    <Progress value={progressValue} />
                    <div style={themeShowcaseStoriesStyles.horizontalGap16Center}>
                      <Spinner size={Size.SM} />
                      <Spinner size={Size.MD} />
                      <Spinner size={Size.LG} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </GridItem>

            {/* Tabs */}
            <GridItem>
              <Card>
                <CardHeader>
                  <CardTitle>Tabs</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultActiveTab="tab1">
                    <div>Tab content would go here</div>
                  </Tabs>
                </CardContent>
              </Card>
            </GridItem>

            {/* Accordion */}
            <GridItem>
              <Card>
                <CardHeader>
                  <CardTitle>Accordion</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion>
                    <div>Accordion content would go here</div>
                  </Accordion>
                </CardContent>
              </Card>
            </GridItem>

            {/* Tooltip and Dropdown */}
            <GridItem>
              <Card>
                <CardHeader>
                  <CardTitle>Tooltip & Dropdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={themeShowcaseStoriesStyles.horizontalGap16Center}>
                    <Tooltip content="This is a tooltip">
                      <Button>Hover for tooltip</Button>
                    </Tooltip>
                    <Dropdown
                      trigger={
                        <DropdownTrigger>
                          <Button variant={ButtonVariant.OUTLINE}>Dropdown</Button>
                        </DropdownTrigger>
                      }
                    >
                      <DropdownItem>Item 1</DropdownItem>
                      <DropdownItem>Item 2</DropdownItem>
                      <DropdownItem>Item 3</DropdownItem>
                    </Dropdown>
                  </div>
                </CardContent>
              </Card>
            </GridItem>

            {/* Divider */}
            <GridItem>
              <Card>
                <CardHeader>
                  <CardTitle>Divider</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={themeShowcaseStoriesStyles.verticalStackGap16}>
                    <p>Content above divider</p>
                    <Divider />
                    <p>Content below divider</p>
                  </div>
                </CardContent>
              </Card>
            </GridItem>
          </Grid>

          {/* Modal */}
          <div style={themeShowcaseStoriesStyles.modalOpenSection}>
            <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          </div>

          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Demo Modal">
            <p>This is a modal content. All components should respect the current theme.</p>
            <div style={themeShowcaseStoriesStyles.modalActionsRow}>
              <Button variant={ButtonVariant.SECONDARY} onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setModalOpen(false)}>Confirm</Button>
            </div>
          </Modal>
        </div>
      </div>
    );
  },
};

