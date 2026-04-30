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

const meta: Meta = {
  title: 'UI Kit/Utils/Theme Showcase',
  parameters: {
    layout: 'fullscreen',
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
      <div style={{ padding: '40px', background: '#EDF1F2', minHeight: '100vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ marginBottom: '40px', textAlign: 'center' }}>UI Components - Light Theme</h1>

          <Grid columns={2} gap={Size.MD}>
            {/* Buttons */}
            <GridItem>
              <Card>
                <CardHeader>
                  <CardTitle>Buttons</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
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
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                    }}
                  >
                    <Input
                      label="Default Input"
                      placeholder="Enter text..."
                      value={inputValue}
                      onChange={e => setInputValue(e.target.value)}
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
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      flexWrap: 'wrap',
                    }}
                  >
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
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                    }}
                  >
                    <Progress value={progressValue} />
                    <div
                      style={{
                        display: 'flex',
                        gap: '16px',
                        alignItems: 'center',
                      }}
                    >
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
                  <div
                    style={{
                      display: 'flex',
                      gap: '16px',
                      alignItems: 'center',
                    }}
                  >
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
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                    }}
                  >
                    <p>Content above divider</p>
                    <Divider />
                    <p>Content below divider</p>
                  </div>
                </CardContent>
              </Card>
            </GridItem>
          </Grid>

          {/* Modal */}
          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          </div>

          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Demo Modal">
            <p>This is a modal content. All components should respect the current theme.</p>
            <div
              style={{
                marginTop: '20px',
                display: 'flex',
                gap: '12px',
                justifyContent: 'flex-end',
              }}
            >
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
      <div style={{ padding: '40px', background: '#06090E', minHeight: '100vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1
            style={{
              marginBottom: '40px',
              textAlign: 'center',
              color: '#FFFFFF',
            }}
          >
            UI Components - Dark Theme
          </h1>

          <Grid columns={2} gap={Size.MD}>
            {/* Buttons */}
            <GridItem>
              <Card>
                <CardHeader>
                  <CardTitle>Buttons</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
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
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                    }}
                  >
                    <Input
                      label="Default Input"
                      placeholder="Enter text..."
                      value={inputValue}
                      onChange={e => setInputValue(e.target.value)}
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
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      flexWrap: 'wrap',
                    }}
                  >
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
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                    }}
                  >
                    <Progress value={progressValue} />
                    <div
                      style={{
                        display: 'flex',
                        gap: '16px',
                        alignItems: 'center',
                      }}
                    >
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
                  <div
                    style={{
                      display: 'flex',
                      gap: '16px',
                      alignItems: 'center',
                    }}
                  >
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
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                    }}
                  >
                    <p>Content above divider</p>
                    <Divider />
                    <p>Content below divider</p>
                  </div>
                </CardContent>
              </Card>
            </GridItem>
          </Grid>

          {/* Modal */}
          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          </div>

          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Demo Modal">
            <p>This is a modal content. All components should respect the current theme.</p>
            <div
              style={{
                marginTop: '20px',
                display: 'flex',
                gap: '12px',
                justifyContent: 'flex-end',
              }}
            >
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

