build-docker:
	docker build --tag=techmatters/terraso_web_client --file=Dockerfile .

clean-docker:
	docker ps --filter name=terraso_web_client* -aq | xargs docker stop
	docker ps --filter name=terraso_web_client* -aq | xargs docker rm

run:
	./scripts/docker/run.sh \
		"--name terraso_web_client -p 3000:3000" \
		"npm start"

run-build:
	./scripts/docker/run.sh \
		"--name terraso_web_client_build -p 3000:3000" \
		"npm run build && npm run build-serve"

build:
	./scripts/docker/run.sh \
		"--name terraso_web_client_build" \
		"npm run build"

format:
	./scripts/docker/run.sh \
		"--name terraso_web_client_format" \
		"npm run format-js && npm run format-css"

lint:
	./scripts/docker/run.sh \
		"--name terraso_web_client_lint" \
		"npm run lint-js && npm run lint-css"

format-css:
	./scripts/docker/run.sh \
		"--name terraso_web_client_format" \
		"npm run format-css"

format-js:
	./scripts/docker/run.sh \
		"--name terraso_web_client_format" \
		"npm run format-js"

lint-js:
	./scripts/docker/run.sh \
		"--name terraso_web_client_lint" \
		"npm run lint-js"

lint-css:
	./scripts/docker/run.sh \
		"--name terraso_web_client_lint" \
		"npm run lint-css"

test:
	./scripts/docker/run.sh \
		"--name terraso_web_client_test" \
		"npm run test"

test-a11y:
	./scripts/docker/run.sh \
		"--name terraso_web_client_test" \
		"TEST_A11Y=true npm run test"

test-coverage:
	./scripts/docker/run.sh \
		"--name terraso_web_client_test_coverage" \
		"npm run test-coverage"


localization-to-po:
	./scripts/docker/run.sh \
		"--name terraso_web_client_localization" \
		"npm run localization-to-po"

localization-to-json:
	./scripts/docker/run.sh \
		"--name terraso_web_client_localization" \
		"npm run localization-to-json"

npm:
	./scripts/docker/run.sh \
		"--name terraso_web_client_npm" \
		"npm $(command)"
