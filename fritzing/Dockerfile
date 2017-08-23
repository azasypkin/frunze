FROM base/archlinux:latest

# build image manually for fastest mirrors
RUN curl -SL "https://www.archlinux.org/mirrorlist/?country=all&use_mirror_status=on&protocol=http&ip_version=4" \
    | sed 's/^#Server/Server/g' \
    > /etc/pacman.d/mirrorlist

RUN pacman --noconfirm --needed -Syu \
    && pacman --noconfirm --needed -S base-devel \
    && pacman --noconfirm --needed -S git desktop-file-utils jre8-openjdk libgit2 python2 qt5-serialport \
    && pacman --noconfirm --needed -S qt5-svg shared-mime-info boost java-environment vim xorg-server-xvfb cmake \
    && pacman -Scc

RUN mkdir /projects
WORKDIR /projects

# Clone Fritzing and parts.
RUN git clone -b issue-xxx-upgrade-to-libgit2 https://github.com/azasypkin/fritzing-app.git
RUN git clone https://github.com/fritzing/fritzing-parts.git

# Build Fritzing from sources.
WORKDIR /projects/fritzing-app
RUN qmake
RUN make

# Expose the port the app runs in.
EXPOSE 8010

CMD ["xvfb-run", "--server-args", "-screen 0 1024x768x24", "/projects/fritzing-app/Fritzing", "-f", "/projects/fritzing-app/", "-parts", "/projects/fritzing-parts/", "-debug", "-port", "8010", "/projects/"]