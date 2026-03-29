# Домашнее задание Prompt Playbook

# Задание

Составить prompt playbook для 3 разных реальных примеров работы в QA. Промпт должен быть написан с возможностью переиспользования для разных кейсов (с использованием placeholder)

# Цель

1. Написать промпты для выполнения рутинной работы в QA
2. Попробовать использовать инструменты для оптимизации промпта:
    * [Prompt Cowboy](https://www.promptcowboy.ai/)
    * [OpenAI prompt optimiser](https://platform.openai.com/chat/edit?models=gpt-5&optimise=true)

# Выбранные шаблоны

1. Обзор IT технологии
2. Пояснение к изменением в коде
3. Сравнение технологий / фреймворков

# Ход решения

## Промпт №1 - обзор IT технологии

### Описание проблемы

Так как я занимаюсь разработкой всемозможных решений в сфере тестирования и являюсь вовлеченным в различные задачи связанными с внедрением новых технологий, мне приходится работать с новыми терминами или названиями технологий. Не всегда они относятся напрямую к QA и тестированию - это могут быть, например, темы безопасности, протоколов общения. Так на собрании может возникнуть новый термин, и мне нужно максимально быстро вникнуть в чем суть этой технологии. Обычно я использую google, но у этого подхода есть некоторые проблемы:
* Реклама - гугл может вывести интересующую меня технологию не на первый план, а предоставить его конкурента, если оплачена реклама
* Отсутствие понимания контекста - хороший пример, это запрос "kafka". Первый ответ google без контекста будет Кафка, Франц, а не Apache Kafka
* Разброс результатов - очень часто описание технологии в первых поисковых результатах может иметь разный характер. То это может быть маркетинговый буклет, где мало говориться о самой технологии, то наоборот, слишком детальное описание с технической точки зрения, но сложно понять основные вещи

### Решение

Для решения этой задачи был написан шаблон промпта.

Промпт имеет следующие параметры:
* technology_name - название интересуемой технологии
* detail_level (brief, standard, detailed) - уровень детализации в ответе, по умолчанию - brief
* focus_areas - необязательный параметр область фокусировки, по умолчанию testing, но можно добавлять

### Промпт

При помощи OpenAI был составлен первоночальный вариант промпта без оптимизации:

```
You are an experienced IT expert with broad, cross-domain knowledge (software engineering, QA, DevOps, security, architecture, data, etc.).

Your goal is to explain a given technology clearly to a Senior QA Automation Engineer who may not be familiar with it.

Technology: {technology_name}

Context:
- The audience is a Senior QA Automation Engineer
- They need a fast, practical understanding
- They may use this knowledge in testing, automation, or system design discussions

Detail level: {detail_level=brief}

Detail level execution rules:

If detail_level = brief:
- Include ONLY:
  1. Short definition (1–2 sentences)
  2. Main purpose and typical use cases
  3. Key features (top 3–4 only)
  4. When to use
- Keep it concise and high-level
- Skip examples, pros/cons, and deep explanations

If detail_level = standard:
- Include:
  1. Definition
  2. Purpose and use cases
  3. Key features
  4. Alternatives/competitors
  5. Simple example
  6. Pros and cons
  7. When to use / when NOT to use

If detail_level = detailed:
- Include ALL of the following:
  1. Definition
  2. Purpose and use cases
  3. Key features
  4. Alternatives/competitors
  5. Real-world example
  6. Pros and cons
  7. How it fits into QA/testing/automation workflows
  8. When to use / when NOT to use
  9. Additional insights (architecture, limitations, scaling, or integration concerns)

Focus areas: {focus_areas=testing}
- If provided, emphasize these areas in your explanation
- If NOT provided, default to "testing"

Output format:
- Structured with bullet points
- Clear and practical language (avoid unnecessary jargon)
- Focus on real-world understanding, not theory
- Strictly follow the sections allowed for the selected detail_level
```
Этот промпт изначально выдавал неплохие результаты.

### Оптимизация

#### [Prompt Cowboy](https://www.promptcowboy.ai/)

```
You are an experienced IT expert with broad cross-domain knowledge spanning software engineering, QA, DevOps, security, architecture, and data systems.

Your task is to explain a technology clearly and practically to a Senior QA Automation Engineer who may not be familiar with it. Your explanation should be immediately actionable—they should finish reading and understand when and how to apply this knowledge in testing, automation, or system design conversations.

**Technology to explain:** {technology_name}

**Audience context:**
- Senior QA Automation Engineer (experienced in testing and automation, may lack depth in this specific technology)
- They need fast, practical understanding over theoretical depth
- They may reference this knowledge in technical discussions or apply it to their work

**Desired detail level:** {detail_level}

**Structure your response based on detail level:**

**If brief:**
- Short definition (1–2 sentences maximum)
- Main purpose and 2–3 typical use cases
- Top 3–4 key features only
- When a QA engineer would actually use this
- Keep the entire response scannable in 2–3 minutes

**If standard:**
- Clear definition
- Purpose and realistic use cases
- 4–5 key features
- Main alternatives or competitors (if applicable)
- One simple, concrete example
- 2–3 genuine pros and 2–3 genuine cons
- When to use it vs. when to skip it

**If detailed:**
- Comprehensive definition and context
- Purpose, use cases, and where it fits in modern development
- Complete feature breakdown
- Alternatives and how they compare
- Real-world example showing practical application
- Honest pros and cons with trade-offs
- How it integrates into QA/testing/automation workflows specifically
- Clear guidance on when to use and when NOT to use
- Additional context (architecture considerations, scaling limitations, common integration challenges, or gotchas)

**Focus areas:** {focus_areas}

If focus areas are specified, emphasize those aspects throughout. If not specified, default to testing and automation perspectives.

**Output guidelines:**
- Use bullet points for clarity and scannability
- Use direct, practical language—avoid unnecessary jargon or assume they'll ask for clarification
- Prioritize real-world understanding over theoretical depth
- Never include content outside the sections permitted for your chosen detail level
- Be honest about limitations and trade-offs; don't oversell
```

#### [OpenAI prompt optimiser](https://platform.openai.com/chat/edit?models=gpt-5&optimise=true)

```
# Role and Objective
Explain the specified technology clearly and practically for a Senior QA Automation Engineer who may not already be familiar with it.

# Instructions
- Act as an experienced IT expert with broad, cross-domain knowledge, including software engineering, QA, DevOps, security, architecture, and data.
- Explain the technology in a way that supports fast, practical understanding.
- Emphasize how the technology may be relevant to testing, automation, or system design discussions.
- Use clear, practical language and avoid unnecessary jargon.
- Focus on real-world understanding rather than theory.

## Technology
- `technology_name`: `kafka`

## Audience Context
- The audience is a Senior QA Automation Engineer.
- They need a fast, practical understanding.
- They may use this knowledge in testing, automation, or system design discussions.

# Detail Level
- `detail_level`: `brief`

## Detail Level Execution Rules
### If `detail_level = brief`
Include only:
1. Short definition (1–2 sentences)
2. Main purpose and typical use cases
3. Key features (top 3–4 only)
4. When to use

Additional rules:
- Keep it concise and high-level.
- Skip examples, pros and cons, and deep explanations.

### If `detail_level = standard`
Include:
1. Definition
2. Purpose and use cases
3. Key features
4. Alternatives/competitors
5. Simple example
6. Pros and cons
7. When to use / when not to use

### If `detail_level = detailed`
Include all of the following:
1. Definition
2. Purpose and use cases
3. Key features
4. Alternatives/competitors
5. Real-world example
6. Pros and cons
7. How it fits into QA/testing/automation workflows
8. When to use / when not to use
9. Additional insights (architecture, limitations, scaling, or integration concerns)

# Focus Areas
- `focus_areas`: `testing`
- If provided, emphasize these areas in the explanation.
- If not provided, default to `testing`.

# Output Format
- Structure the response with bullet points.
- Use clear and practical language.
- Avoid unnecessary jargon.
- Focus on real-world understanding, not theory.
- Strictly follow only the sections allowed for the selected `detail_level`.

# Verbosity
- Match the selected `detail_level`.
- For `brief`, keep the response concise and high-level.
```

#### Отличия в оптимизации

Основное отличие было в том, что [Prompt Cowboy](https://www.promptcowboy.ai/) отошел от использования названия для placeholder внутри промта, [OpenAI prompt optimiser](https://platform.openai.com/chat/edit?models=gpt-5&optimise=true) же напротив, оставил эти placeholder и возможность быстрее их находить. В этом плане для решения повседневных задач, я остановил свой выбор на оптимизированном [OpenAI prompt optimiser](https://platform.openai.com/chat/edit?models=gpt-5&optimise=true) решении.

#### Примеры вывода

##### Пример 1. detail_level: brief

Входные данные:
```
technology_name: kafka
detail_level: brief
focus_areas: testing
```

##### Результат:
```
* **Definition:** Apache Kafka is a distributed messaging system that enables applications to send, receive, and process streams of data in real time. It acts as a reliable, high-throughput pipeline for events and messages.

* **Purpose & Typical Use Cases:**

  * Decoupling microservices or systems through asynchronous communication.
  * Real-time event streaming and processing for analytics, monitoring, or business logic.
  * Tracking system events, logs, or metrics for auditing or observability.

* **Key Features:**

  * High-throughput, low-latency message delivery.
  * Durable, persistent message storage.
  * Scalable via topic partitions and multiple brokers.
  * Consumer groups for parallel processing and load balancing.

* **When to Use:**

  * Testing event-driven systems or microservices interactions.
  * Automating validation of message flows, event ordering, or triggers.
  * Simulating load and verifying system behavior under high message volumes.
```

##### Пример 2. detail_level: detailed

Входящие данные:
```
technology_name: kafka
detail_level: detailed
focus_areas: testing
```

##### Результат:

```
* **Definition:** Apache Kafka is a distributed, high-throughput messaging and event streaming platform that allows applications and services to publish, consume, and process streams of data in real time. It serves as a durable and scalable pipeline for exchanging events across systems.

* **Purpose & Typical Use Cases:**

  * Enable asynchronous communication between microservices and distributed systems.
  * Real-time data streaming for analytics, monitoring, or business processes.
  * Log aggregation, system event tracking, and metrics collection.
  * Building event-driven architectures and workflow pipelines.

* **Key Features:**

  * Persistent, durable storage of messages for replay and audit.
  * Partitioned topics for high throughput and parallel processing.
  * Consumer groups to distribute processing across multiple instances.
  * Low-latency, high-volume message handling for real-time systems.

* **Alternatives/Competitors:**

  * RabbitMQ (more traditional message queue, simpler routing).
  * Amazon Kinesis (cloud-native streaming).
  * Pulsar (similar streaming platform with multi-tenancy and geo-replication).

* **Real-World Example:**

  * A payment system emits transaction events to Kafka topics. Multiple services consume these events: one updates user balances, another triggers notifications, and a third logs them for audit. QA engineers can validate end-to-end event delivery and ordering without touching the core services.

* **Pros and Cons:**

  * **Pros:** Highly scalable, fault-tolerant, durable, supports replay of messages.
  * **Cons:** Setup and operational overhead, requires careful topic and partition design, learning curve for event-driven testing.

* **How it Fits into QA/Testing/Automation Workflows:**

  * Enables simulation of real-world event flows in automated tests.
  * Allows testing of message ordering, retries, and failure recovery scenarios.
  * Useful for integration testing between decoupled microservices or event-driven systems.
  * Supports monitoring of event streams to validate system behavior under load.

* **When to Use / When Not to Use:**

  * **Use:** For testing and validating event-driven or microservices architectures, asynchronous workflows, or real-time data processing.
  * **Avoid:** For simple request-response messaging or low-throughput scenarios where full-scale streaming infrastructure is overkill.

* **Additional Insights (Architecture, Limitations, Scaling, Integration):**

  * Kafka relies on brokers, topics, partitions, and consumer groups; understanding these is key for testing parallel processing.
  * Scaling involves adding brokers and repartitioning topics; testing must account for distributed consistency and ordering.
  * Integration requires proper serialization formats (JSON, Avro, Protobuf) and schema management.
  * Monitoring lag, offsets, and consumer health is critical for QA validation in production-like environments.
```

## Промпт №2 - пояснение к изменением в коде

### Описание проблемы

Несмотря на то, что в перечень моих обязанностей не входит непосредственно code-review, так как политика моей компании заключается в том, что на каждые изменения требуется минимум 2 ревью со стороны разработчиков, у меня постоянно возникает потребность понять изменения в коде. На это могут быть разные причины, например, понять как связаны изменения в коде с бизнес требованиями, понять как протестировать эти изменения. Кроме того, иногда логика изменений может быть слишком сложной, или изменения могут быть в конфигурационных файлах, а у меня нет понимания как пишутся данные конфигурации.

### Решение

Для более масштабного решения, который пройдет по всем изменениям в разных частях кода скорее-всего необходимо написать полноценный агент. Но для небольших изменений (ограниченных методом, файлом), не требуещей полноценной работы агента, вполне подойдет шаблон промпта, где основными параметрами будет:

* code_before_changes - код до изменений
* code_after_changes - код после изменений со стороны разработчика
* file_extension - расширение файла
* context - контекст в рамках которых были данные изменения

### Промпт

```
You are a Senior QA Engineer analyzing code changes for testing and quality assurance.

Your task is to examine the code before and after changes, then provide a comprehensive quality analysis focused on behavior, risks, edge cases, and validation strategy. You are NOT reviewing code style, refactoring opportunities, or implementation approach—only the testability and quality implications of what has changed.

**Input:**
- Code before changes: `{{code_before_changes}}`
- Code after changes: `{{code_after_changes}}`
- File type: `{{file_extension}}`
- Additional context: `{{context}}`

**Your Analysis Should Cover:**

1. **Summary of Changes** — Describe what has changed in plain language, focusing only on behavioral or logical differences that matter for testing.

2. **Behavioral Impact** — Identify what behavior has changed, what new flows or conditions exist, and what outputs differ. Be explicit about what the code now does versus what it did before.

3. **Risk Analysis** — Surface what could break:
   - Edge cases that might not be handled
   - Regression risks (existing functionality that could be affected)
   - Hidden side effects or cascading impacts
   - Dependency or integration risks

4. **Testing Strategy** — Outline how to validate these changes:
   - Positive test scenarios (happy path)
   - Negative test scenarios (error handling, invalid inputs)
   - Edge cases and boundary conditions
   - Regression areas that need verification

5. **Concrete Test Cases** — Provide actionable, specific test scenarios. Use structured format (bullet points, numbered steps, or scenarios). Include preconditions, actions, and expected outcomes where clarity matters.

6. **Configuration Analysis** — If changes involve configuration files:
   - Explain what each changed parameter controls
   - Describe failure modes or risks from misconfiguration
   - Suggest how to validate the configuration is correct

7. **Observability & Debugging** — Identify what should be monitored:
   - Key logs or error messages to watch for
   - Metrics or signals that indicate success or failure
   - How to detect problems in production
   - What debugging information would be useful if something goes wrong

8. **Uncertainties & Open Questions** — Flag what is unclear or ambiguous:
   - What assumptions did you make?
   - What should the developer clarify?
   - What information would make your analysis more complete?

**Important:**
- Think from a QA and testing perspective, not a developer's perspective.
- Prioritize real-world failure scenarios and practical validation.
- Be actionable—every test case and risk should be something someone can actually execute or investigate.
- State any assumptions explicitly.
- Ignore code style, naming conventions, or refactoring suggestions unless they directly impact testability or correctness.
```

### Оптимизация

#### [Prompt Cowboy](https://www.promptcowboy.ai/)
```
You are a Senior QA Engineer analyzing code changes for testing and quality assurance purposes only—not for style, refactoring, or implementation critique.

**Input:**
- Code before changes: `{{code_before_changes}}`
- Code after changes: `{{code_after_changes}}`
- File type: `{{file_extension}}`
- Additional context: `{{context}}`

Examine both versions and produce a structured quality analysis covering the following:

**1. Summary of Changes**
Describe what changed in plain language—only behavioral or logical differences that affect testing.

**2. Behavioral Impact**
Identify what the code now does versus before: changed flows, new conditions, different outputs or return values.

**3. Risk Analysis**
Surface what could break:
- Unhandled edge cases
- Regression risks to existing functionality
- Hidden side effects or cascading impacts
- Dependency or integration risks

**4. Testing Strategy**
Outline how to validate the changes:
- Happy path scenarios
- Error handling and invalid input scenarios
- Edge cases and boundary conditions
- Regression areas requiring re-verification

**5. Concrete Test Cases**
Provide specific, actionable test scenarios with preconditions, actions, and expected outcomes. Format for clarity and executability.

**6. Configuration Analysis** *(if changes involve config files)*
Explain what each changed parameter controls, failure modes from misconfiguration, and how to validate correctness.

**7. Observability & Debugging**
Identify what to monitor in production:
- Key logs and error messages
- Metrics that signal success or failure
- Detection signals for silent failures
- Useful debugging information if something goes wrong

**8. Uncertainties & Open Questions**
Flag what is unclear: assumptions made, what the developer should clarify, and what additional context would sharpen the analysis.

**Constraints:**
- Reason exclusively from a QA perspective, not a developer's
- Every risk and test case must be actionable—something a person can actually execute or investigate
- State all assumptions explicitly
- Ignore code style, naming conventions, and refactoring unless they directly affect correctness or testability
- Prioritize real-world failure scenarios over theoretical ones
```

#### [OpenAI prompt optimiser](https://platform.openai.com/chat/edit?models=gpt-5&optimise=true)

```
Analyze code changes as a Senior QA Engineer focused on testing and quality assurance.

Use the inputs below to compare the code before and after the change, then provide a comprehensive quality analysis centered on behavior, risks, edge cases, and validation strategy. Do not review code style, refactoring opportunities, or implementation approach unless they directly affect testability or correctness.

**Input**
- Code before changes: `{{code_before_changes}}`
- Code after changes: `{{code_after_changes}}`
- File type: `{{file_extension}}`
- Additional context: `{{context}}`

**Required output sections**

1. **Summary of Changes**
   - Describe the changes in plain language.
   - Focus only on behavioral or logical differences that matter for testing.

2. **Behavioral Impact**
   - Identify what behavior changed.
   - Note any new flows, conditions, or output differences.
   - Be explicit about what the code now does versus what it did before.

3. **Risk Analysis**
   - Edge cases that might not be handled
   - Regression risks affecting existing functionality
   - Hidden side effects or cascading impacts
   - Dependency or integration risks

4. **Testing Strategy**
   - Positive test scenarios (happy path)
   - Negative test scenarios (error handling, invalid inputs)
   - Edge cases and boundary conditions
   - Regression areas that need verification

5. **Concrete Test Cases**
   - Provide actionable, specific test scenarios.
   - Use a structured format such as bullet points, numbered steps, or scenarios.
   - Include preconditions, actions, and expected outcomes where helpful for clarity.

6. **Configuration Analysis**
   - If the changes involve configuration files:
     - Explain what each changed parameter controls
     - Describe failure modes or risks from misconfiguration
     - Suggest how to validate the configuration is correct

7. **Observability & Debugging**
   - Key logs or error messages to watch for
   - Metrics or signals that indicate success or failure
   - How to detect problems in production
   - What debugging information would be useful if something goes wrong

8. **Uncertainties & Open Questions**
   - Flag anything unclear or ambiguous.
   - State any assumptions explicitly.
   - Note what the developer should clarify.
   - Identify what additional information would make the analysis more complete.

**Requirements**
- Think from a QA and testing perspective, not a developer perspective.
- Prioritize real-world failure scenarios and practical validation.
- Keep the analysis actionable: every risk and test case should be something that can be executed or investigated.
- Ignore code style, naming conventions, and refactoring suggestions unless they directly impact testability or correctness.
```

#### Отличия в оптимизации

Отличия не были очень существенные, но [OpenAI prompt optimiser](https://platform.openai.com/chat/edit?models=gpt-5&optimise=true) обозначил некоторые пункты более развернуто:
```
2. **Behavioral Impact**
   - Identify what behavior changed.
   - Note any new flows, conditions, or output differences.
   - Be explicit about what the code now does versus what it did before.
```
В сравнении с решением от [Prompt Cowboy](https://www.promptcowboy.ai/)
```
**2. Behavioral Impact**
Identify what the code now does versus before: changed flows, new conditions, different outputs or return values.
```
Также [OpenAI prompt optimiser](https://platform.openai.com/chat/edit?models=gpt-5&optimise=true) предоставил больше изменений связанных с правильным использованием промпта в техническом плане.

#### Примеры вывода

##### Пример изменения в коде

Входные данные:
```
code_before_changes:
async function processPayment(orderId, userId) {
    const order = await getOrder(orderId);

    if (!order || order.status !== "pending") {
        throw new Error("Invalid order");
    }

    const result = await paymentProvider.charge(userId, order.amount);

    if (result.success) {
        order.status = "paid";
        await saveOrder(order);
    } else {
        order.status = "failed";
        await saveOrder(order);
    }

    return result;
}

code_after_changes:
async function processPayment(orderId, userId) {
    const order = await getOrder(orderId);

    if (!order) {
        throw new Error("Order not found");
    }

    if (order.status === "paid") {
        return { success: true, message: "Already processed" };
    }

    if (order.status !== "pending" && order.status !== "retry") {
        throw new Error("Invalid order state");
    }

    const idempotencyKey = `${orderId}-${userId}`;

    const result = await paymentProvider.charge(userId, order.amount, {
        idempotencyKey
    });

    if (result.success) {
        order.status = "paid";
    } else {
        order.retryCount = (order.retryCount || 0) + 1;

        if (order.retryCount >= 3) {
            order.status = "failed";
        } else {
            order.status = "retry";
        }
    }

    await saveOrder(order);

    return result;
}

file_extension:
js

context:
JIRA: PAY-4821

Title: Implement safe payment retries with idempotency

Description:
Currently, duplicate payment requests can lead to double charges if the client retries due to timeouts.
We need to:
- Introduce idempotency to prevent duplicate charges
- Allow retrying failed payments up to 3 times
- Avoid re-processing already successful payments
- Support a new intermediate "retry" state

Acceptance Criteria:
- Payment provider must receive an idempotency key
- Retrying the same request should not double charge
- Orders in "paid" state must not trigger another charge
- Failed payments should retry up to 3 times before final failure
- System should remain backward compatible with existing orders

Notes:
- Some existing orders do not have retryCount field
- External provider may return success but network may fail before response is received
```

##### Результат

```
## 1. Summary of Changes

The payment processing logic has been enhanced to support **idempotency and controlled retries**:

* Introduced **idempotency key** when calling the payment provider to prevent duplicate charges.
* Added support for a new order state: `"retry"`.
* Implemented **retry logic with a maximum of 3 attempts** using `retryCount`.
* Changed handling of already processed orders:

  * `"paid"` orders now return success without calling the provider.
* Split validation errors:

  * `"Order not found"` vs `"Invalid order state"`.
* Consolidated persistence (`saveOrder`) into a single call.
* Backward compatibility consideration: handles missing `retryCount`.

---

## 2. Behavioral Impact

### Key Behavior Changes

1. **Idempotency introduced**

   * Before: repeated calls → multiple charges possible.
   * Now: same `(orderId, userId)` uses same idempotency key → provider should deduplicate.

2. **Retry flow added**

   * Before: single attempt → `"paid"` or `"failed"`.
   * Now:

     * Failure increments `retryCount`
     * `< 3` → `"retry"`
     * `>= 3` → `"failed"`

3. **New valid order state**

   * `"retry"` is now treated as eligible for processing.

4. **Already paid orders**

   * Before: would throw `"Invalid order"` (since not `"pending"`).
   * Now: returns `{ success: true, message: "Already processed" }` without charging.

5. **Error handling split**

   * Before: generic `"Invalid order"`
   * Now:

     * `"Order not found"`
     * `"Invalid order state"`

6. **Provider call signature changed**

   * Now includes `{ idempotencyKey }`

7. **State persistence timing**

   * Before: saved inside both success/failure branches.
   * Now: always saved once after logic.

---

## 3. Risk Analysis

### Edge Cases

* **Idempotency collision risk**

  * Key = `${orderId}-${userId}`
  * If business allows multiple payments per order/user (partial payments, retries after long time), collisions may cause incorrect deduplication.

* **Retry count overflow / misuse**

  * If `retryCount` is manually corrupted (e.g., negative or very large), logic may behave incorrectly.

* **Missing retryCount (legacy orders)**

  * Handled via `(order.retryCount || 0)` → good
  * Risk: non-numeric values (e.g., string `"1"`) could lead to unexpected increments.

* **Concurrent requests**

  * Two parallel calls:

    * Both read `retryCount = 2`
    * Both increment → both think they reached 3
    * Potential duplicate charge attempts (idempotency should mitigate, but state may be inconsistent)

* **Provider success but network failure**

  * Mentioned in requirements
  * Risk:

    * Provider processes payment
    * Client retries → idempotency protects provider side
    * BUT local state may still be `"retry"` → inconsistency until next call

* **Order stuck in "retry"**

  * No backoff or scheduling mechanism shown → depends on external retry trigger

---

### Regression Risks

* Existing flows relying on:

  * `"Invalid order"` error message → now changed
  * `"paid"` orders throwing error → now returning success
* Downstream systems expecting:

  * Only `"pending" | "paid" | "failed"` states
* Payment provider integration:

  * Signature change (extra parameter) could break compatibility

---

### Hidden Side Effects

* **Silent success for already paid orders**

  * Could mask unintended duplicate calls
* **Retry state persistence**

  * Systems not aware of `"retry"` may misinterpret order status

---

### Integration Risks

* Payment provider must:

  * Support idempotency keys correctly
  * Treat identical keys consistently across retries

---

## 4. Testing Strategy

### Positive Scenarios

* Successful payment from `"pending"`
* Retry flow: failure → retry → success
* Retry up to max attempts → final failure
* Already paid order → no provider call

### Negative Scenarios

* Invalid order states
* Missing order
* Provider failure responses
* Provider timeout / partial failure simulation

### Edge Cases

* Legacy orders without `retryCount`
* Concurrent execution
* Duplicate requests with same idempotency key
* Corrupted `retryCount`

### Regression Areas

* Error messages
* State transitions
* Provider invocation behavior
* Persistence correctness

---

## 5. Concrete Test Cases

### 1. Happy Path – Successful Payment

* **Precondition:** Order status = `"pending"`, retryCount undefined
* **Action:** Call `processPayment`
* **Expected:**

  * Provider called with idempotencyKey
  * Order status → `"paid"`
  * retryCount unchanged
  * Result.success = true

---

### 2. Retry Then Success

* **Precondition:** Order status = `"retry"`, retryCount = 1
* **Action:** Provider returns success
* **Expected:**

  * Order status → `"paid"`
  * retryCount remains 1
  * No further retries

---

### 3. Retry Until Failure Limit

* **Precondition:** Order status = `"retry"`, retryCount = 2
* **Action:** Provider returns failure
* **Expected:**

  * retryCount → 3
  * Order status → `"failed"`

---

### 4. Retry Below Limit

* **Precondition:** Order status = `"pending"`, retryCount undefined
* **Action:** Provider returns failure
* **Expected:**

  * retryCount → 1
  * Order status → `"retry"`

---

### 5. Already Paid Order

* **Precondition:** Order status = `"paid"`
* **Action:** Call function
* **Expected:**

  * Provider NOT called
  * Response: `{ success: true, message: "Already processed" }`

---

### 6. Invalid State

* **Precondition:** Order status = `"cancelled"`
* **Action:** Call function
* **Expected:** Throws `"Invalid order state"`

---

### 7. Order Not Found

* **Precondition:** `getOrder` returns null
* **Expected:** Throws `"Order not found"`

---

### 8. Idempotency Verification

* **Precondition:** Same order, same user
* **Action:** Call twice (simulate retry)
* **Expected:**

  * Same idempotency key used
  * Provider should not double charge (mock verification)

---

### 9. Concurrent Execution

* **Precondition:** Order status `"retry"`, retryCount = 2
* **Action:** Trigger two parallel calls
* **Expected:**

  * Only one effective charge (provider-level)
  * Final state consistent (`"failed"` or `"paid"` depending on mock)

---

### 10. Corrupted retryCount

* **Precondition:** retryCount = `"2"` (string)
* **Action:** Failure response
* **Expected:**

  * Validate increment behavior (should become 3 or fail safely)

---

### 11. Provider Success but Lost Response

* **Precondition:** Simulate provider success but client timeout
* **Action:** Retry call
* **Expected:**

  * Same idempotency key reused
  * No double charge
  * Eventually state becomes `"paid"`

---

## 6. Configuration Analysis

No explicit configuration files changed, but implicit configuration exists:

* **Idempotency key format**

  * Controls uniqueness of payment attempts
  * Risk: poor design → collisions or unintended deduplication

* **Retry limit (hardcoded = 3)**

  * Risk:

    * Too low → legitimate payments fail prematurely
    * Too high → excessive retries/charges attempts

### Validation

* Validate idempotency uniqueness across:

  * Different users
  * Same order across time
* Confirm provider respects idempotency window

---

## 7. Observability & Debugging

### Logs to Add / Monitor

* Payment attempt with:

  * orderId, userId, retryCount, idempotencyKey
* Provider response (success/failure)
* State transitions (`pending → retry → failed/paid`)

### Metrics

* Retry rate per order
* Payment success rate
* Duplicate request frequency
* نسبة orders reaching retry limit

### Detecting Issues

* Spike in `"retry"` or `"failed"` states
* Multiple retries without resolution
* Mismatch between provider success and local `"retry"` state

### Debugging Aids

* Correlate logs using idempotencyKey
* Track retryCount evolution per order
* Audit trail of state changes

---

## 8. Uncertainties & Open Questions

1. **Idempotency scope**

   * Does provider guarantee idempotency across:

     * Time window?
     * Different parameters (amount changes)?

2. **Concurrency handling**

   * Is there DB-level locking or optimistic concurrency control?

3. **Retry triggering mechanism**

   * Who retries `"retry"` orders? (cron, user action, queue?)

4. **State model completeness**

   * Are there other states (e.g., `"cancelled"`, `"refunded"`)? How should they behave?

5. **Error handling for provider exceptions**

   * What happens if `paymentProvider.charge` throws instead of returning `{ success: false }`?

6. **Data validation**

   * Should `retryCount` be strictly typed/validated?

7. **Backward compatibility**

   * Are downstream systems ready for `"retry"` state?

---

This change significantly improves robustness against duplicate charges, but introduces **state complexity, concurrency risks, and dependency on provider idempotency guarantees**, which should be thoroughly validated in both functional and integration testing.

```

## Промпт №3 - сравнение технологий / фреймворков

### Описание проблемы

Периодически моя задача - предложить новое решение для внедрения в компании. Примеры таких решений - это использование Cypress или Playwright для UI тестирования или сравнить альтернативы JMeter для нагрузочного тестирования - Gatling, Artillery, Grafana k6. Я хочу, чтобы формат сравнения был предсказуемым, чтобы в будущем можно было сравнивать отчеты между собой. Идеально, если это будет табличка. Данный промпт не должен быть строго сфокусирован на QA, а быть общим решением. Если необходимо привязка к QA будет добавлена в контекст.

### Решение

Для решения этой задачи был написан шаблон промпта.

Промпт имеет следующие параметры:
* technologies - название технологий, фреймворков, решений, которые я хочу сравнить
* context - дополнительный контекст задачи по внедрению технологии
* usage_area - область применения в которой буду использовать. Результат сравнения Cypress и Playwright может сильно отличаться, если использовать для UI или для API тестирования
* limitations - ограничения по внедрению технологий 

### Промпт

С помощью OpenAI был написан данный промпт, который сразу дал приемлимый результат:

```
You are a senior software architect and technology evaluator.

Your task is to perform a structured and unbiased comparison of the following technologies:

Technologies:
{{technologies}}

Context:
{{context}}

Usage Area:
{{usage_area}}

Limitations:
{{limitations}}

---

### Instructions

Provide the entire comparison strictly in TABLE FORMAT.

---

### 1. Overview Table

| Technology | Description | Primary Use Cases |
|------------|------------|------------------|
| ...        | ...        | ...              |

---

### 2. Feature Comparison Table

| Feature | {{tech1}} | {{tech2}} | {{tech3}} | Notes |
|--------|----------|----------|----------|------|
| ...    | ...      | ...      | ...      | ...  |

(Add/remove columns depending on number of technologies)

---

### 3. Pros & Cons Table

| Technology | Pros | Cons |
|-----------|------|------|
| ...       | ...  | ...  |

---

### 4. Performance & Scalability Table

| Technology | Performance | Scalability | Resource Efficiency |
|-----------|------------|------------|---------------------|
| ...       | ...        | ...        | ...                 |

---

### 5. Developer Experience Table

| Technology | Setup Ease | Learning Curve | Documentation | Community |
|-----------|------------|---------------|--------------|----------|
| ...       | ...        | ...           | ...          | ...      |

---

### 6. Ecosystem & Integrations Table

| Technology | Plugins | Integrations | Tool Compatibility |
|-----------|--------|-------------|--------------------|
| ...       | ...    | ...         | ...                |

---

### 7. Maintenance & Viability Table

| Technology | Maturity | Release Frequency | Stability | Risk Level |
|-----------|----------|------------------|----------|-----------|
| ...       | ...      | ...              | ...      | ...       |

---

### 8. Limitations Fit Table

| Technology | Fits Limitations? | Issues | Workarounds |
|-----------|------------------|--------|------------|
| ...       | ...              | ...    | ...        |

---

### 9. Best Use Cases Table

| Technology | Best Use Cases |
|-----------|---------------|
| ...       | ...           |

---

### 10. Summary Table

| Criteria | {{tech1}} | {{tech2}} | {{tech3}} |
|----------|----------|----------|----------|
| Ease of Use | ... | ... | ... |
| Performance | ... | ... | ... |
| Flexibility | ... | ... | ... |
| Ecosystem | ... | ... | ... |
| Overall | ... | ... | ... |

---

### 11. Recommendation Table

| Scenario | Recommended Technology | Reason |
|----------|----------------------|--------|
| ...      | ...                  | ...    |

---

### Output Requirements

- ALL output must be in tables (no paragraphs outside tables)
- Be concise and specific
- Avoid vague statements
- Ensure fair and unbiased comparison
- Adapt number of columns dynamically based on technologies
```

### Оптимизация

#### [Prompt Cowboy](https://www.promptcowboy.ai/)

```
You are a senior software architect and technology evaluator specializing in structured, evidence-based technology assessments.

Your task is to perform a comprehensive, unbiased comparison of the following technologies:

**Technologies:** {{technologies}}

**Context:** {{context}}

**Usage Area:** {{usage_area}}

**Limitations:** {{limitations}}

---

### Instructions

Deliver the **entire comparison in table format only**—no prose, paragraphs, or commentary outside of tables. Every insight must live inside a table cell. Be concise, specific, and evidence-based. Avoid vague qualifiers. Ensure fair representation of each technology.

Dynamically adjust column counts based on the number of technologies provided.

---

Produce the following tables in sequence:

**1. Overview Table** — Technology name, one-sentence description, primary use cases.

**2. Feature Comparison Table** — One row per relevant feature, one column per technology, plus a Notes column for nuance.

**3. Pros & Cons Table** — Bulleted pros and cons per technology in a single row each.

**4. Performance & Scalability Table** — Performance characteristics, scalability ceiling, and resource efficiency per technology.

**5. Developer Experience Table** — Setup ease, learning curve, documentation quality, and community size/health.

**6. Ecosystem & Integrations Table** — Plugin availability, third-party integrations, and tool compatibility.

**7. Maintenance & Viability Table** — Project maturity, release frequency, stability track record, and long-term risk level.

**8. Limitations Fit Table** — Whether each technology fits the stated limitations, specific issues if not, and known workarounds.

**9. Best Use Cases Table** — Concrete scenarios where each technology excels.

**10. Summary Scorecard Table** — Rate each technology across: Ease of Use, Performance, Flexibility, Ecosystem, and Overall. Use a consistent rating scale (e.g., ⭐1–5 or Low/Medium/High).

**11. Recommendation Table** — Map specific scenarios or decision contexts to the recommended technology with a clear, one-sentence justification per row.
```

#### [OpenAI prompt optimiser](https://platform.openai.com/chat/edit?models=gpt-5&optimise=true)

```
You are a senior software architect and technology evaluator.

Your task is to perform a structured and unbiased comparison of the following technologies:

Technologies:
{{technologies}}

Context:
{{context}}

Usage Area:
{{usage_area}}

Limitations:
{{limitations}}

---

### Instructions

Provide the entire comparison strictly in TABLE FORMAT. Reason internally and do not reveal your chain-of-thought. If information is uncertain, context-dependent, or varies by version, state that concisely in the relevant table cell instead of guessing.

---

### 1. Overview Table

| Technology | Description | Primary Use Cases |
|------------|------------|------------------|
| ...        | ...        | ...              |

---

### 2. Feature Comparison Table

| Feature | {{tech1}} | {{tech2}} | {{tech3}} | Notes |
|--------|----------|----------|----------|------|
| ...    | ...      | ...      | ...      | ...  |

(Add/remove columns depending on number of technologies)

---

### 3. Pros & Cons Table

| Technology | Pros | Cons |
|-----------|------|------|
| ...       | ...  | ...  |

---

### 4. Performance & Scalability Table

| Technology | Performance | Scalability | Resource Efficiency |
|-----------|------------|------------|---------------------|
| ...       | ...        | ...        | ...                 |

---

### 5. Developer Experience Table

| Technology | Setup Ease | Learning Curve | Documentation | Community |
|-----------|------------|---------------|--------------|----------|
| ...       | ...        | ...           | ...          | ...      |

---

### 6. Ecosystem & Integrations Table

| Technology | Plugins | Integrations | Tool Compatibility |
|-----------|--------|-------------|--------------------|
| ...       | ...    | ...         | ...                |

---

### 7. Maintenance & Viability Table

| Technology | Maturity | Release Frequency | Stability | Risk Level |
|-----------|----------|------------------|----------|-----------|
| ...       | ...      | ...              | ...      | ...       |

---

### 8. Limitations Fit Table

| Technology | Fits Limitations? | Issues | Workarounds |
|-----------|------------------|--------|------------|
| ...       | ...              | ...    | ...        |

---

### 9. Best Use Cases Table

| Technology | Best Use Cases |
|-----------|---------------|
| ...       | ...           |

---

### 10. Summary Table

| Criteria | {{tech1}} | {{tech2}} | {{tech3}} |
|----------|----------|----------|----------|
| Ease of Use | ... | ... | ... |
| Performance | ... | ... | ... |
| Flexibility | ... | ... | ... |
| Ecosystem | ... | ... | ... |
| Overall | ... | ... | ... |

---

### 11. Recommendation Table

| Scenario | Recommended Technology | Reason |
|----------|----------------------|--------|
| ...      | ...                  | ...    |

---

### Output Requirements

- ALL output must be in tables (no paragraphs outside tables)
- Use markdown tables only, with no text before, between, or after the tables except the table headings shown here
- Be concise and specific
- Avoid vague statements
- Ensure fair and unbiased comparison
- Adapt number of columns dynamically based on technologies
- Preserve the section order and include every table, even if some cells must note limited or unavailable information
```

#### Отличия в оптимизации

В данном случае [Prompt Cowboy](https://www.promptcowboy.ai/) снова попытался отойти от структуры, убрав важные аспекты и примеры как должны выглядить выходные данные. Результат этого промпта ожидается более непредсказуемым, чем в версии от [OpenAI prompt optimiser](https://platform.openai.com/chat/edit?models=gpt-5&optimise=true), который наоборот старался максимально структурировать выходные данные.

#### Примеры вывода

##### Пример анализа технологий

Входные данные:
```
technologies: k6, gatling, jmeter
context: Compare solution for load testing for QA team. No sophisticated logic needed, simple Api calls with growing count.
usage_area: Load testing
limitations: Must be easily deployed to Azure pipeline. No mayor security issues
```

##### Результат:

```
### 1. Overview Table

| Technology | Description                                                                                                             | Primary Use Cases                                                                   |
| ---------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| k6         | Modern open-source load testing tool using JavaScript for scripting; CLI-first with optional cloud offering             | API load testing, CI/CD performance testing, lightweight performance checks         |
| Gatling    | High-performance load testing tool using Scala-based DSL (and Java support); focused on efficiency and detailed reports | High-throughput API testing, performance benchmarking, enterprise-grade simulations |
| JMeter     | Mature Java-based load testing tool with GUI and plugin ecosystem                                                       | General load testing, legacy systems, UI-driven test creation                       |

---

### 2. Feature Comparison Table

| Feature               | k6                             | Gatling                    | JMeter                             | Notes                          |
| --------------------- | ------------------------------ | -------------------------- | ---------------------------------- | ------------------------------ |
| Scripting Language    | JavaScript                     | Scala DSL (Java supported) | XML (GUI) / Java / Groovy          | k6 easiest for most QA teams   |
| CLI Support           | Strong                         | Strong                     | Moderate                           | JMeter more GUI-oriented       |
| CI/CD Integration     | Excellent                      | Good                       | Good                               | k6 best fit for pipelines      |
| Distributed Testing   | Limited (OSS); strong in cloud | Enterprise version needed  | Supported via plugins/manual setup | k6 OSS scaling requires setup  |
| Reporting             | Built-in + external (Grafana)  | Rich HTML reports          | GUI + plugins                      | Gatling reports very detailed  |
| Protocol Support      | HTTP/HTTPS, WebSocket, gRPC    | HTTP primarily             | Wide (HTTP, JDBC, FTP, etc.)       | JMeter supports most protocols |
| Ease of Test Creation | High                           | Medium                     | Medium (GUI helps)                 | Depends on team skillset       |
| Headless Execution    | Native                         | Native                     | Supported but less natural         | Important for pipelines        |
| Extensibility         | Moderate                       | Moderate                   | High                               | JMeter plugin ecosystem large  |

---

### 3. Pros & Cons Table

| Technology | Pros                                                                             | Cons                                                              |
| ---------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| k6         | Simple JS scripting; CI/CD friendly; lightweight; good observability integration | Limited protocol support; distributed testing less mature in OSS  |
| Gatling    | High performance; efficient resource usage; detailed reports                     | Scala DSL learning curve; advanced features often enterprise-only |
| JMeter     | Very mature; large plugin ecosystem; broad protocol support; GUI                 | Heavy resource usage; harder CI/CD integration; less modern UX    |

---

### 4. Performance & Scalability Table

| Technology | Performance                           | Scalability                                | Resource Efficiency  |
| ---------- | ------------------------------------- | ------------------------------------------ | -------------------- |
| k6         | High for API workloads                | Good; better with cloud/distributed setup  | High (low footprint) |
| Gatling    | Very high (non-blocking architecture) | Excellent (enterprise version scales well) | Very high            |
| JMeter     | Moderate (thread-based)               | Moderate (requires tuning/distribution)    | Low to moderate      |

---

### 5. Developer Experience Table

| Technology | Setup Ease | Learning Curve          | Documentation | Community  |
| ---------- | ---------- | ----------------------- | ------------- | ---------- |
| k6         | Very easy  | Low (JavaScript)        | Good          | Growing    |
| Gatling    | Moderate   | Medium-high (Scala DSL) | Good          | Medium     |
| JMeter     | Easy (GUI) | Medium                  | Extensive     | Very large |

---

### 6. Ecosystem & Integrations Table

| Technology | Plugins                          | Integrations                                | Tool Compatibility           |
| ---------- | -------------------------------- | ------------------------------------------- | ---------------------------- |
| k6         | Limited                          | Grafana, Prometheus, Azure DevOps, CI tools | Excellent with modern DevOps |
| Gatling    | Limited (OSS); richer enterprise | CI/CD tools, APM tools                      | Strong in enterprise setups  |
| JMeter     | Extensive                        | CI/CD, monitoring tools, many plugins       | Very broad compatibility     |

---

### 7. Maintenance & Viability Table

| Technology | Maturity        | Release Frequency | Stability   | Risk Level |
| ---------- | --------------- | ----------------- | ----------- | ---------- |
| k6         | Medium (modern) | Active            | Stable      | Low        |
| Gatling    | High            | Active            | Very stable | Low        |
| JMeter     | Very high       | Moderate          | Very stable | Very low   |

---

### 8. Limitations Fit Table

| Technology | Fits Limitations?  | Issues                                       | Workarounds                       |
| ---------- | ------------------ | -------------------------------------------- | --------------------------------- |
| k6         | Yes (strong fit)   | Distributed load limited in OSS              | Use k6 Cloud or container scaling |
| Gatling    | Yes (with caveats) | Scala complexity; enterprise features locked | Use Java API; limit to OSS scope  |
| JMeter     | Partial            | Heavy for pipelines; harder automation       | Run in CLI mode; optimize configs |

---

### 9. Best Use Cases Table

| Technology | Best Use Cases                                                     |
| ---------- | ------------------------------------------------------------------ |
| k6         | Simple API load tests, CI/CD pipelines, incremental load scenarios |
| Gatling    | High-scale performance benchmarking, detailed reporting needs      |
| JMeter     | Legacy systems, multi-protocol testing, GUI-driven QA workflows    |

---

### 10. Summary Table

| Criteria    | k6     | Gatling             | JMeter    |
| ----------- | ------ | ------------------- | --------- |
| Ease of Use | High   | Medium              | Medium    |
| Performance | High   | Very high           | Medium    |
| Flexibility | Medium | Medium              | High      |
| Ecosystem   | Medium | Medium              | Very high |
| Overall     | High   | High (advanced use) | Medium    |

---

### 11. Recommendation Table

| Scenario                                              | Recommended Technology | Reason                                             |
| ----------------------------------------------------- | ---------------------- | -------------------------------------------------- |
| Simple API load testing in Azure Pipelines            | k6                     | Lightweight, JS-based, excellent CI/CD integration |
| High-performance benchmarking with detailed reports   | Gatling                | Superior performance model and reporting           |
| Legacy QA team using GUI tools and multiple protocols | JMeter                 | Mature ecosystem and broad protocol support        |
```