'use client';

import { Loader2Icon, SendIcon, SquareIcon, XIcon, ChartPieIcon } from 'lucide-react';
import type {
  ComponentProps,
  HTMLAttributes,
  KeyboardEventHandler,
} from 'react';
import { Children, useState } from 'react';
import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { ChatStatus } from 'ai';

export type PromptInputProps = HTMLAttributes<HTMLFormElement> & {
  isCompact?: boolean;
  onToggleView?: () => void;
};

const PromptInputContext = React.createContext<{
  onToggleView?: () => void;
}>({});

export const usePromptInputContext = () => React.useContext(PromptInputContext);

export const PromptInput = ({ className, isCompact = false, onToggleView, children, ...props }: PromptInputProps) => {

  if (isCompact) {
    return (
      <motion.div
        layoutId="prompt-container-compact"
        className={cn(
          'w-[200px] h-12 rounded-3xl border bg-background shadow-sm hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer flex items-center justify-center transition-colors',
          className,
        )}
        onClick={onToggleView}
        initial={false}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.5
        }}
      >
        <motion.span 
          layoutId="prompt-placeholder-compact"
          className="text-sm text-muted-foreground"
        >
          Ask me anything...
        </motion.span>
      </motion.div>
    );
  }

  return (
    <PromptInputContext.Provider value={{ onToggleView }}>
      <motion.form
        layoutId="prompt-container-large"
        className={cn(
          'w-full divide-y overflow-hidden rounded-xl border bg-background shadow-sm',
          className,
        )}
        initial={false}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.5
        }}
        {...props}
      >
        {children}
      </motion.form>
    </PromptInputContext.Provider>
  );
};

export type PromptInputTextareaProps = ComponentProps<typeof Textarea> & {
  minHeight?: number;
  maxHeight?: number;
};

export const PromptInputTextarea = ({
  onChange,
  className,
  placeholder = 'What would you like to know?',
  minHeight = 48,
  maxHeight = 164,
  ...props
}: PromptInputTextareaProps) => {
  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Allow newline
        return;
      }

      // Submit on Enter (without Shift)
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) {
        form.requestSubmit();
      }
    }
  };

  return (
    <motion.div className="relative">
      <Textarea
        className={cn(
          'w-full resize-none rounded-none border-none p-3 shadow-none outline-none ring-0',
          'bg-transparent dark:bg-transparent field-sizing-content max-h-[6lh]',
          'focus-visible:ring-0',
          className,
        )}
        name="message"
        onChange={(e) => {
          onChange?.(e);
        }}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        {...props}
      />
      <motion.span 
        layoutId="prompt-placeholder-large"
        className="absolute left-3 top-3 text-sm text-muted-foreground pointer-events-none opacity-0"
      />
    </motion.div>
  );
};

export type PromptInputToolbarProps = HTMLAttributes<HTMLDivElement>;

export const PromptInputToolbar = ({
  className,
  children,
  ...props
}: PromptInputToolbarProps) => {
  const { onToggleView } = usePromptInputContext();
  
  return (
    <div
      className={cn('flex items-center justify-between p-1', className)}
      {...props}
    >
      <AnimatePresence>
        {onToggleView && (
          <motion.div
            key="toggle-view-button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 gap-1.5 rounded-lg text-muted-foreground h-8 w-8"
              onClick={onToggleView}
              type="button"
            >
              <ChartPieIcon className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
};

export type PromptInputToolsProps = HTMLAttributes<HTMLDivElement>;

export const PromptInputTools = ({
  className,
  ...props
}: PromptInputToolsProps) => (
  <div
    className={cn(
      'flex items-center gap-1',
      '[&_button:first-child]:rounded-bl-xl',
      className,
    )}
    {...props}
  />
);

export type PromptInputButtonProps = ComponentProps<typeof Button>;

export const PromptInputButton = ({
  variant = 'ghost',
  className,
  size,
  ...props
}: PromptInputButtonProps) => {
  const newSize =
    (size ?? Children.count(props.children) > 1) ? 'default' : 'icon';

  return (
    <Button
      className={cn(
        'shrink-0 gap-1.5 rounded-lg',
        variant === 'ghost' && 'text-muted-foreground',
        newSize === 'default' && 'px-3',
        className,
      )}
      size={newSize}
      type="button"
      variant={variant}
      {...props}
    />
  );
};

export type PromptInputSubmitProps = ComponentProps<typeof Button> & {
  status?: ChatStatus;
};

export const PromptInputSubmit = ({
  className,
  variant = 'default',
  size = 'icon',
  status,
  children,
  ...props
}: PromptInputSubmitProps) => {
  let Icon = <SendIcon className="size-4" />;

  if (status === 'submitted') {
    Icon = <Loader2Icon className="size-4 animate-spin" />;
  } else if (status === 'streaming') {
    Icon = <SquareIcon className="size-4" />;
  } else if (status === 'error') {
    Icon = <XIcon className="size-4" />;
  }

  return (
    <Button
      className={cn('gap-1.5 rounded-lg', className)}
      size={size}
      type="submit"
      variant={variant}
      {...props}
    >
      {children ?? Icon}
    </Button>
  );
};

export type PromptInputModelSelectProps = ComponentProps<typeof Select>;

export const PromptInputModelSelect = (props: PromptInputModelSelectProps) => (
  <Select {...props} />
);

export type PromptInputModelSelectTriggerProps = ComponentProps<
  typeof SelectTrigger
>;

export const PromptInputModelSelectTrigger = ({
  className,
  ...props
}: PromptInputModelSelectTriggerProps) => (
  <SelectTrigger
    className={cn(
      'border-none bg-transparent font-medium text-muted-foreground shadow-none transition-colors',
      'hover:bg-accent hover:text-foreground [&[aria-expanded="true"]]:bg-accent [&[aria-expanded="true"]]:text-foreground',
      className,
    )}
    {...props}
  />
);

export type PromptInputModelSelectContentProps = ComponentProps<
  typeof SelectContent
>;

export const PromptInputModelSelectContent = ({
  className,
  ...props
}: PromptInputModelSelectContentProps) => (
  <SelectContent className={cn(className)} {...props} />
);

export type PromptInputModelSelectItemProps = ComponentProps<typeof SelectItem>;

export const PromptInputModelSelectItem = ({
  className,
  ...props
}: PromptInputModelSelectItemProps) => (
  <SelectItem className={cn(className)} {...props} />
);

export type PromptInputModelSelectValueProps = ComponentProps<
  typeof SelectValue
>;

export const PromptInputModelSelectValue = ({
  className,
  ...props
}: PromptInputModelSelectValueProps) => (
  <SelectValue className={cn(className)} {...props} />
);
