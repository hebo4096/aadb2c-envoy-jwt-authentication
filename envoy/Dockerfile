FROM envoyproxy/envoy:v1.28-latest

COPY front-envoy.yaml.tmpl /config/
COPY docker-entrypoint.sh /

# Add Permission for docker entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["-c", "/etc/front-envoy.yaml", "--service-cluster", "front-proxy", "--component-log-level", "${ENVOY_DEBUG_LEVEL}"]
